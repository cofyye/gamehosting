import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as ModActions from './mod.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { ModService } from '../../services/mod.service';

@Injectable()
export class ModEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _modService: ModService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addMod$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ModActions.ADD_MOD),
      mergeMap((action) =>
        this._modService.addMod(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_MOD_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_MOD',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_MOD_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_MOD',
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteMod$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ModActions.DELETE_MOD),
      mergeMap((action) =>
        this._modService.deleteMod(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_MOD_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_MOD', response })
            );

            return ModActions.DELETE_MOD_RESPONSE({
              data: action.payload,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_MOD_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_MOD', response })
            );

            return of(
              ModActions.DELETE_MOD_RESPONSE({
                data: '',
              })
            );
          })
        )
      )
    )
  );

  loadMods$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ModActions.LOAD_MODS),
      mergeMap(() =>
        this._modService.getMods().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MODS',
                response,
              })
            );

            return ModActions.LOAD_MODS_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MODS',
                response,
              })
            );

            return of(
              ModActions.LOAD_MODS_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );

  loadModsByGameId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ModActions.LOAD_MODS_BY_GAME_ID),
      mergeMap((action) =>
        this._modService.getModsByGameId(action.payload).pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MODS_BY_GAME_ID',
                response,
              })
            );

            return ModActions.LOAD_MODS_BY_GAME_ID_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MODS_BY_GAME_ID',
                response,
              })
            );

            return of(
              ModActions.LOAD_MODS_BY_GAME_ID_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
