import { createReducer, on } from '@ngrx/store';
import { initialState, gameAdapter } from './game.state';
import {
  DELETE_GAME_RESPONSE,
  DESELECT_GAME,
  LOAD_GAMES_BY_MACHINE_ID_RESPONSE,
  LOAD_GAMES_RESPONSE,
  SELECT_GAME,
} from './game.actions';

export const gameReducer = createReducer(
  initialState,
  on(LOAD_GAMES_RESPONSE, (state, { data }) => {
    return gameAdapter.setAll(data, state);
  }),
  on(LOAD_GAMES_BY_MACHINE_ID_RESPONSE, (state, { data }) => {
    return gameAdapter.setAll(data, state);
  }),
  on(DELETE_GAME_RESPONSE, (state, { data }) => {
    return gameAdapter.removeOne(data, state);
  }),
  on(SELECT_GAME, (state, { id }) => ({
    ...state,
    selectedGameId: id,
  })),
  on(DESELECT_GAME, (state) => ({
    ...state,
    selectedGameId: null,
  }))
);
