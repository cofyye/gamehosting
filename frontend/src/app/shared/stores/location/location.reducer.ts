import { createReducer, on } from '@ngrx/store';
import { initialState, locationAdapter } from './location.state';
import {
  ADD_LOCATION_RESPONSE,
  DELETE_LOCATION_RESPONSE,
  DESELECT_LOCATION,
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_RESPONSE,
  SELECT_LOCATION,
} from './location.actions';

export const locationReducer = createReducer(
  initialState,
  on(LOAD_LOCATIONS, (state) => ({
    ...state,
    loaded: false,
  })),
  on(LOAD_LOCATIONS_RESPONSE, (state, { response, data }) => {
    return locationAdapter.setAll(data, {
      ...state,
      response,
      loaded: true,
    });
  }),
  on(ADD_LOCATION_RESPONSE, (state, { response }) => ({
    ...state,
    response,
  })),
  on(DELETE_LOCATION_RESPONSE, (state, { response, data }) => ({
    ...locationAdapter.removeOne(data, state),
    response,
  })),
  on(SELECT_LOCATION, (state, { id }) => ({
    ...state,
    selectedLocationId: id,
  })),
  on(DESELECT_LOCATION, (state) => ({
    ...state,
    selectedLocationId: null,
  }))
);
