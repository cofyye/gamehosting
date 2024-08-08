import { createFeatureSelector, createSelector } from '@ngrx/store';
import { locationAdapter, LocationState } from './location.state';

const { selectAll } = locationAdapter.getSelectors();

export const SELECT_LOCATION_STATE =
  createFeatureSelector<LocationState>('location');

export const SELECT_LOCATIONS = createSelector(
  SELECT_LOCATION_STATE,
  selectAll
);

export const SELECT_LOCATION_RESPONSE = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.response
);

export const SELECT_LOCATION_LOADED = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.loaded
);
