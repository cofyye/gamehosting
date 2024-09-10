import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as ServerActions from './server.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { ServerService } from '../../services/server.service';

@Injectable()
export class ServerEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _serverService: ServerService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addServer$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ServerActions.ADD_SERVER),
      mergeMap((action) =>
        this._serverService.addServer(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_SERVER_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_SERVER',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_SERVER_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_SERVER',
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteServer$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ServerActions.DELETE_SERVER),
      mergeMap((action) =>
        this._serverService.deleteServer(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_SERVER_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_SERVER', response })
            );

            return ServerActions.DELETE_SERVER_RESPONSE({
              data: action.payload,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_SERVER_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_SERVER', response })
            );

            return of(
              ServerActions.DELETE_SERVER_RESPONSE({
                data: '',
              })
            );
          })
        )
      )
    )
  );

  loadServers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ServerActions.LOAD_SERVERS),
      mergeMap(() =>
        this._serverService.getServers().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_SERVERS',
                response,
              })
            );

            return ServerActions.LOAD_SERVERS_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_SERVERS',
                response,
              })
            );

            return of(
              ServerActions.LOAD_SERVERS_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
