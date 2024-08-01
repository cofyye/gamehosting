import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { STOP_LOADING } from '../../../shared/store/loader/loader.actions';
import { UtilsService } from '../../../shared/services/utils.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _utilsService: UtilsService,
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

            return response;
          }),
          map((response) => AuthActions.REGISTER_SUCCESS({ response })),
          catchError((err: HttpErrorResponse) => {
            const error: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(error);

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
      mergeMap((action) =>
        this._authService.login(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'LOGIN_BTN' }));

            return response;
          }),
          map((response) => AuthActions.LOGIN_SUCCESS({ response })),
          catchError((err: HttpErrorResponse) => {
            const error: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(error);

            this._store.dispatch(STOP_LOADING({ key: 'LOGIN_BTN' }));

            return of(AuthActions.LOGIN_FAILURE({ error: '' }));
          })
        )
      )
    )
  );
}
