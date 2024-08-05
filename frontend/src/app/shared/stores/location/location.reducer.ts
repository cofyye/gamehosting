import { createReducer, on } from '@ngrx/store';
import { initialState } from './location.state';
import { LOCATION_ADD_SUCCESS } from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOCATION_ADD_SUCCESS, (state, { response }) => ({
    ...state,
    response,
  }))
);
