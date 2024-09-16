import { createReducer, on } from '@ngrx/store';
import { initialState, gameAdapter } from './game.state';
import {
  DELETE_GAME_RESPONSE,
  REMOVE_SELECTED_GAME,
  LOAD_GAMES_BY_MACHINE_ID_RESPONSE,
  LOAD_GAMES_RESPONSE,
  SET_SELECTED_GAME,
} from './game.actions';

export const gameReducer = createReducer(
  initialState,
  on(LOAD_GAMES_RESPONSE, (state, { data }) => {
    return gameAdapter.setAll(data, state);
  }),
  on(LOAD_GAMES_BY_MACHINE_ID_RESPONSE, (state, { data }) => {
    return gameAdapter.setAll(data, state);
  }),
  on(DELETE_GAME_RESPONSE, (state, { id }) => {
    return gameAdapter.removeOne(id, state);
  }),
  on(SET_SELECTED_GAME, (state, { id }) => ({
    ...state,
    selectedGameId: id,
  })),
  on(REMOVE_SELECTED_GAME, (state) => ({
    ...state,
    selectedGameId: null,
  }))
);
