import { createReducer, on } from '@ngrx/store';
import { initialState, modAdapter } from './mod.state';
import {
  DELETE_MOD_RESPONSE,
  DESELECT_MOD,
  LOAD_MODS_RESPONSE,
  SELECT_MOD,
} from './mod.actions';

export const modReducer = createReducer(
  initialState,
  on(LOAD_MODS_RESPONSE, (state, { data }) => {
    return modAdapter.setAll(data, state);
  }),
  on(DELETE_MOD_RESPONSE, (state, { data }) => {
    return modAdapter.removeOne(data, state);
  }),
  on(SELECT_MOD, (state, { id }) => ({
    ...state,
    selectedModId: id,
  })),
  on(DESELECT_MOD, (state) => ({
    ...state,
    selectedModId: null,
  }))
);
