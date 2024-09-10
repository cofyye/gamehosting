import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as GameActions from './game.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { GameService } from '../../services/game.service';

@Injectable()
export class GameEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _gameService: GameService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.ADD_GAME),
      mergeMap((action) =>
        this._gameService.addGame(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_GAME_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_GAME',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_GAME_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_GAME',
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.DELETE_GAME),
      mergeMap((action) =>
        this._gameService.deleteGame(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_GAME_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_GAME', response })
            );

            return GameActions.DELETE_GAME_RESPONSE({
              data: action.payload,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_GAME_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_GAME', response })
            );

            return of(
              GameActions.DELETE_GAME_RESPONSE({
                data: '',
              })
            );
          })
        )
      )
    )
  );

  loadGames$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.LOAD_GAMES),
      mergeMap(() =>
        this._gameService.getGames().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_GAMES',
                response,
              })
            );

            return GameActions.LOAD_GAMES_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_GAMES',
                response,
              })
            );

            return of(
              GameActions.LOAD_GAMES_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );

  loadGamesByMachineId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.LOAD_GAMES_BY_MACHINE_ID),
      mergeMap((action) =>
        this._gameService.getGamesByMachineId(action.payload).pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_GAMES_BY_MACHINE_ID',
                response,
              })
            );

            return GameActions.LOAD_GAMES_BY_MACHINE_ID_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_GAMES_BY_MACHINE_ID',
                response,
              })
            );

            return of(
              GameActions.LOAD_GAMES_BY_MACHINE_ID_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
