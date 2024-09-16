import { createReducer, on } from '@ngrx/store';
import { initialState, locationAdapter } from './location.state';
import {
  DELETE_LOCATION_RESPONSE,
  REMOVE_SELECTED_LOCATION,
  LOAD_LOCATIONS_RESPONSE,
  SET_SELECTED_LOCATION,
  LOAD_LOCATION_RESPONSE,
} from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOAD_LOCATIONS_RESPONSE, (state, { data }) => {
    return locationAdapter.setAll(data, state);
  }),
  on(LOAD_LOCATION_RESPONSE, (state, { data }) => {
    return locationAdapter.setOne(data, state);
  }),
  on(DELETE_LOCATION_RESPONSE, (state, { data }) => {
    return locationAdapter.removeOne(data, state);
  }),
  on(SET_SELECTED_LOCATION, (state, { id }) => ({
    ...state,
    selectedLocationId: id,
  })),
  on(REMOVE_SELECTED_LOCATION, (state) => ({
    ...state,
    selectedLocationId: null,
  }))
);
