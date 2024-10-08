import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  EMPTY,
  filter,
  map,
  mergeMap,
  of,
  retry,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import * as AuthActions from './auth.actions';
import * as moment from 'moment-timezone';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UtilsService } from '../../../shared/services/utils.service';
import { SELECT_AUTH_STATE } from './auth.selectors';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { AuthService } from '../../services/auth.service';
import { STOP_LOADING } from '../loader/loader.actions';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../models/response.model';
import * as HttpActions from '../http/http.actions';
import { SELECT_HTTP_RESPONSE } from '../http/http.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _utilsService: UtilsService,
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.REGISTER),
      mergeMap((action) =>
        this._authService.register(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'REGISTER_BTN' }));

            this._router.navigate(['/auth/login']);

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'REGISTER',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'REGISTER_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'REGISTER',
                response,
              })
            );
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.LOGIN),
      withLatestFrom(this._store.select(SELECT_AUTH_STATE)),
      mergeMap(([action, state]) =>
        this._authService.login(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'LOGIN_BTN' }));

            this._router.navigate(['/']);

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'LOGIN', response })
            );

            return AuthActions.SAVE_AUTH({
              auth: {
                user: response.data.user,
                expirationDate: response.data.expirationDate,
                loggedIn: true,
                fetched: state.auth.fetched,
              },
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IDataAcceptResponse<{ verified: boolean }> =
              err.error as IDataAcceptResponse<{ verified: boolean }>;

            this._store.dispatch(STOP_LOADING({ key: 'LOGIN_BTN' }));

            if (response?.data?.verified === false) {
              this._router.navigate(['/auth/verification/resend']);
            }

            return of(
              HttpActions.SET_RESPONSE({
                key: 'LOGIN',
                response,
              })
            );
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.LOGOUT),
      withLatestFrom(this._store.select(SELECT_AUTH_STATE)),
      mergeMap(([_, state]) =>
        this._authService.logout().pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._router.navigate(['/']);

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'LOGOUT', response })
            );

            return AuthActions.SAVE_AUTH({
              auth: {
                expirationDate: undefined,
                user: undefined,
                loggedIn: false,
                fetched: state.auth.fetched,
              },
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            return of(
              HttpActions.SET_RESPONSE({
                key: 'LOGOUT',
                response,
              })
            );
          })
        )
      )
    )
  );

  setTokenExpiration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.SAVE_AUTH),
      switchMap((action) => {
        const expirationDate = action.auth.expirationDate;

        if (!expirationDate) {
          return EMPTY;
        }

        const expirationMoment = moment
          .tz(expirationDate, moment.tz.guess())
          .utc();
        const currentUtcTime = moment.utc();

        const timerDuration =
          expirationMoment.diff(currentUtcTime, 'milliseconds') - 19000; // 19 seconds before end

        // console.log(timerDuration);

        if (timerDuration <= 0) {
          return of(AuthActions.REGENERATE_TOKEN());
        }

        return timer(timerDuration).pipe(
          takeUntil(
            this._store.select(SELECT_HTTP_RESPONSE('LOGOUT')).pipe(
              filter((response) => !!response),
              map((response) => response?.success === true),
              take(1)
            )
          ),
          map(() => AuthActions.REGENERATE_TOKEN())
          // tap(() => console.log('call API'))
        );
      })
    )
  );

  regenerateToken$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.REGENERATE_TOKEN),
      withLatestFrom(this._store.select(SELECT_AUTH_STATE)),
      mergeMap(([_, state]) =>
        this._authService.regenerateToken().pipe(
          retry({ count: 3, delay: 3000 }),
          map((response) =>
            AuthActions.SAVE_AUTH({
              auth: {
                ...state.auth,
                expirationDate: response.data,
              },
            })
          ),
          catchError(() => {
            this._toasterService.warning(
              'Your session token will expire in 10 seconds.',
              'Warning'
            );

            return timer(10000).pipe(
              tap(() => {
                this._router.navigate(['/']);
                this._toasterService.error(
                  'Your session token has expired. Please log in again.',
                  'Error'
                );
              }),
              concatMap(() =>
                of(
                  AuthActions.SAVE_AUTH({
                    auth: {
                      expirationDate: undefined,
                      user: undefined,
                      loggedIn: false,
                      fetched: state.auth.fetched,
                    },
                  })
                )
              )
            );
          })
        )
      )
    )
  );

  forgotPw$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.FORGOT_PW),
      mergeMap((action) =>
        this._authService.forgotPassword(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'FORGOT_PW_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'FORGOT_PW',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'FORGOT_PW_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'FORGOT_PW',
                response,
              })
            );
          })
        )
      )
    )
  );

  resendVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.RESEND_VERIFICATION),
      mergeMap((action) =>
        this._authService.resendVerification(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(
              STOP_LOADING({ key: 'RESEND_VERIFICATION_BTN' })
            );

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'RESEND_VERIFICATION',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              STOP_LOADING({ key: 'RESEND_VERIFICATION_BTN' })
            );

            return of(
              HttpActions.SET_RESPONSE({
                key: 'RESEND_VERIFICATION',
                response,
              })
            );
          })
        )
      )
    )
  );

  confirmVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.CONFIRM_VERIFICATION),
      mergeMap((action) =>
        this._authService.confirmEmail(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'CONFIRM_VERIFICATION',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            return of(
              HttpActions.SET_RESPONSE({
                key: 'CONFIRM_VERIFICATION',
                response,
              })
            );
          })
        )
      )
    )
  );

  resetPasswordAccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.RESET_PASSWORD_ACCESS),
      mergeMap((action) =>
        this._authService.resetPasswordAccess(action.payload).pipe(
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'RESET_PASSWORD_ACCESS',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            return of(
              HttpActions.SET_RESPONSE({
                key: 'RESET_PASSWORD_ACCESS',
                response,
              })
            );
          })
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.RESET_PASSWORD),
      mergeMap((action) =>
        this._authService.resetPassword(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'RESET_PASSWORD_BTN' }));

            this._router.navigate(['/auth/login']);

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'RESET_PASSWORD',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'RESET_PASSWORD_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'RESET_PASSWORD',
                response,
              })
            );
          })
        )
      )
    )
  );
}
