import { createReducer, on } from '@ngrx/store';
import { initialState, locationAdapter } from './location.state';
import {
  DELETE_LOCATION_RESPONSE,
  DESELECT_LOCATION,
  LOAD_LOCATIONS_RESPONSE,
  SELECT_LOCATION,
} from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOAD_LOCATIONS_RESPONSE, (state, { data }) => {
    return locationAdapter.setAll(data, state);
  }),
  on(DELETE_LOCATION_RESPONSE, (state, { data }) => {
    return locationAdapter.removeOne(data, state);
  }),
  on(SELECT_LOCATION, (state, { id }) => ({
    ...state,
    selectedLocationId: id,
  })),
  on(DESELECT_LOCATION, (state) => ({
    ...state,
    selectedLocationId: null,
  }))
);
