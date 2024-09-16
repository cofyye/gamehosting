import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as UserActions from './user.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.ADD_USER),
      mergeMap((action) =>
        this._userService.addUser(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_USER_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_USER',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_USER_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_USER',
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.DELETE_USER),
      mergeMap((action) =>
        this._userService.deleteUser(action.id).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_USER_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_USER', response })
            );

            return UserActions.DELETE_USER_RESPONSE({
              id: action.id,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_USER_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_USER', response })
            );

            return of(
              UserActions.DELETE_USER_RESPONSE({
                id: '',
              })
            );
          })
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.LOAD_USERS),
      mergeMap(() =>
        this._userService.getUsers().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_USERS',
                response,
              })
            );

            return UserActions.LOAD_USERS_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_USERS',
                response,
              })
            );

            return of(
              UserActions.LOAD_USERS_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
