import { createReducer, on } from '@ngrx/store';
import { initialState, locationAdapter } from './location.state';
import {
  ADD_LOCATION_SUCCESS,
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_FAILURE,
  LOAD_LOCATIONS_SUCCESS,
  SELECT_LOCATION,
} from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOAD_LOCATIONS, (state) => ({
    ...state,
    loaded: false,
  })),
  on(ADD_LOCATION_SUCCESS, (state, { response }) => ({
    ...state,
    response,
  })),
  on(LOAD_LOCATIONS_SUCCESS, (state, { response, data }) => {
    return locationAdapter.setAll(data, {
      ...state,
      response,
      loaded: true,
    });
  }),
  on(LOAD_LOCATIONS_FAILURE, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  })),
  on(SELECT_LOCATION, (state, { id }) => ({
    ...state,
    selectedLocationId: id,
  }))
);
