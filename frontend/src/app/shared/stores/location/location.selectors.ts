import { createFeatureSelector, createSelector } from '@ngrx/store';
import { locationAdapter, LocationState } from './location.state';

const { selectAll, selectEntities } = locationAdapter.getSelectors();

export const SELECT_LOCATION_STATE =
  createFeatureSelector<LocationState>('location');

export const SELECT_LOCATIONS = createSelector(
  SELECT_LOCATION_STATE,
  selectAll
);

export const SELECT_LOCATIONS_ENTITIES = createSelector(
  SELECT_LOCATION_STATE,
  selectEntities
);

export const SELECT_LOCATION_RESPONSE = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.response
);

export const SELECT_LOCATION_LOADED = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.loaded
);

export const SELECT_SELECTED_LOCATION_ID = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.selectedLocationId
);

export const SELECT_SELECTED_LOCATION = createSelector(
  SELECT_LOCATIONS_ENTITIES,
  SELECT_SELECTED_LOCATION_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
