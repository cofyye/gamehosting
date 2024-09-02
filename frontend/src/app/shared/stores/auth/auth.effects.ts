import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  mergeMap,
  of,
  retry,
  switchMap,
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
import { UserRole } from '../../../shared/enums/user.enum';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { AuthService } from '../../services/auth.service';
import { STOP_LOADING } from '../loader/loader.actions';

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
          map(() => AuthActions.REGISTER_SUCCESS()),
          catchError(() => {
            this._store.dispatch(STOP_LOADING({ key: 'REGISTER_BTN' }));

            return of(AuthActions.REGISTER_FAILURE({ error: '' }));
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
          map((response) =>
            AuthActions.SAVE_AUTH({
              auth: {
                id: response.data.id,
                role: response.data.role,
                expirationDate: response.data.expirationDate,
                loggedIn: true,
                fetched: state.auth.fetched,
              },
            })
          ),
          catchError(() => {
            this._store.dispatch(STOP_LOADING({ key: 'LOGIN_BTN' }));

            return of(AuthActions.LOGIN_FAILURE({ error: '' }));
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
                      expirationDate: null,
                      id: '',
                      loggedIn: false,
                      fetched: state.auth.fetched,
                      role: UserRole.USER,
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
          map(() => AuthActions.FORGOT_PW_SUCCESS()),
          catchError(() => {
            this._store.dispatch(STOP_LOADING({ key: 'FORGOT_PW_BTN' }));

            return of(AuthActions.FORGOT_PW_FAILURE({ error: '' }));
          })
        )
      )
    )
  );
}
