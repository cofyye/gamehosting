import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationState } from './location.state';

export const SELECT_LOCATION_STATE =
  createFeatureSelector<LocationState>('location');

export const SELECT_LOCATIONS = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.locations
);

export const SELECT_LOCATION_RESPONSE = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.response
);
