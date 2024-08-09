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
    _http: {
      ['LOAD_LOCATIONS']: {
        ...state._http['LOAD_LOCATIONS'],
        loaded: false,
      },
    },
  })),
  on(LOAD_LOCATIONS_RESPONSE, (state, { response, data }) => {
    return locationAdapter.setAll(data, {
      ...state,
      _http: {
        ['LOAD_LOCATIONS']: {
          response,
          loaded: true,
        },
      },
    });
  }),
  on(ADD_LOCATION_RESPONSE, (state, { response }) => ({
    ...state,
    _http: {
      ['ADD_LOCATION']: {
        ...state._http['ADD_LOCATION'],
        response,
      },
    },
  })),
  on(DELETE_LOCATION_RESPONSE, (state, { response, data }) => ({
    ...locationAdapter.removeOne(data, state),
    _http: {
      ['DELETE_LOCATION']: {
        ...state._http['DELETE_LOCATION'],
        response,
      },
    },
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
