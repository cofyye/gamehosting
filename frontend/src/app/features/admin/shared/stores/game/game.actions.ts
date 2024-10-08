import { createAction, props } from '@ngrx/store';
import { IGameAddRequest } from '../../models/game-request.model';
import { IGameResponse } from '../../models/game-response.model';

export const ADD_GAME = createAction(
  '[Game] Add Game',
  props<{
    payload: IGameAddRequest;
  }>()
);

export const DELETE_GAME = createAction(
  '[Game] Delete Game',
  props<{
    id: string;
  }>()
);

export const DELETE_GAME_RESPONSE = createAction(
  '[Game] Delete Game Response',
  props<{ id: string }>()
);

export const LOAD_GAMES = createAction('[Game] Load Games');

export const LOAD_GAMES_RESPONSE = createAction(
  '[Game] Load Games Response',
  props<{ data: IGameResponse[] }>()
);

export const LOAD_GAMES_BY_MACHINE_ID = createAction(
  '[Game] Load Games By Machine Id',
  props<{
    id: string;
  }>()
);

export const LOAD_GAMES_BY_MACHINE_ID_RESPONSE = createAction(
  '[Game] Load Games By Machine Id Response',
  props<{ data: IGameResponse[] }>()
);

export const SET_SELECTED_GAME = createAction(
  '[Game] Set Selected Game',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_GAME = createAction('[Game] Remove Selected Game');
