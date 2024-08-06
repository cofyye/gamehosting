import { createReducer, on } from '@ngrx/store';
import { initialState } from './location.state';
import {
  LOCATION_ADD_SUCCESS,
  LOCATIONS_LOAD,
  LOCATIONS_LOAD_FAILURE,
  LOCATIONS_LOAD_SUCCESS,
} from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOCATIONS_LOAD, (state) => ({
    ...state,
    loaded: false,
  })),
  on(LOCATION_ADD_SUCCESS, (state, { response }) => ({
    ...state,
    response,
  })),
  on(LOCATIONS_LOAD_SUCCESS, (state, { response, data }) => ({
    ...state,
    response,
    locations: data,
    loaded: true,
  })),
  on(LOCATIONS_LOAD_FAILURE, (state, { error }) => ({
    ...state,
    loaded: true,
  }))
);
