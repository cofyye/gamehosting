import { createAction, props } from '@ngrx/store';
import { IGameAddRequest } from '../models/game-request.model';
import { IGameResponse } from '../models/game-response.model';

export const ADD_GAME = createAction(
  '[Game] Add Game',
  props<{
    payload: IGameAddRequest;
  }>()
);

export const DELETE_GAME = createAction(
  '[Game] Delete Game',
  props<{
    payload: string;
  }>()
);

export const DELETE_GAME_RESPONSE = createAction(
  '[Game] Delete Game Response',
  props<{ data: string }>()
);

export const LOAD_GAMES = createAction('[Game] Load Games');

export const LOAD_GAMES_RESPONSE = createAction(
  '[Game] Load Games Response',
  props<{ data: IGameResponse[] }>()
);

export const SELECT_GAME = createAction(
  '[Game] Select Game',
  props<{ id: string }>()
);

export const DESELECT_GAME = createAction('[Game] Deselect Game');
