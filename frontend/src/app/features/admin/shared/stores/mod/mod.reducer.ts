import { createReducer, on } from '@ngrx/store';
import { initialState, modAdapter } from './mod.state';
import {
  DELETE_MOD_RESPONSE,
  REMOVE_SELECTED_MOD,
  LOAD_MODS_BY_GAME_ID_RESPONSE,
  LOAD_MODS_RESPONSE,
  SET_SELECTED_MOD,
} from './mod.actions';

export const modReducer = createReducer(
  initialState,
  on(LOAD_MODS_RESPONSE, (state, { data }) => {
    return modAdapter.setAll(data, state);
  }),
  on(LOAD_MODS_BY_GAME_ID_RESPONSE, (state, { data }) => {
    return modAdapter.setAll(data, state);
  }),
  on(DELETE_MOD_RESPONSE, (state, { id }) => {
    return modAdapter.removeOne(id, state);
  }),
  on(SET_SELECTED_MOD, (state, { id }) => ({
    ...state,
    selectedModId: id,
  })),
  on(REMOVE_SELECTED_MOD, (state) => ({
    ...state,
    selectedModId: null,
  }))
);
