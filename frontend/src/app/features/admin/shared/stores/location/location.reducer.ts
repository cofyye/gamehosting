import { createReducer, on } from '@ngrx/store';
import { initialState, locationAdapter } from './location.state';
import {
  DELETE_LOCATION_RESPONSE,
  REMOVE_SELECTED_LOCATION,
  LOAD_LOCATIONS_RESPONSE,
  SET_SELECTED_LOCATION,
  LOAD_LOCATION_RESPONSE,
  EDIT_LOCATION_RESPONSE,
} from './location.actions';
import { Update } from '@ngrx/entity';
import { ILocationResponse } from '../../models/location-response.model';

export const locationReducer = createReducer(
  initialState,
  on(LOAD_LOCATIONS_RESPONSE, (state, { data }) => {
    return locationAdapter.setAll(data, state);
  }),
  on(LOAD_LOCATION_RESPONSE, (state, { data }) => {
    if (data) {
      return locationAdapter.setOne(data, state);
    }
    return state;
  }),
  on(DELETE_LOCATION_RESPONSE, (state, { id }) => {
    return locationAdapter.removeOne(id, state);
  }),
  on(EDIT_LOCATION_RESPONSE, (state, { data }) => {
    if (data) {
      const update: Update<ILocationResponse> = {
        id: data.id,
        changes: data,
      };

      return locationAdapter.updateOne(update, state);
    }
    return state;
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
