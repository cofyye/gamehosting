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

export const SELECT_LOCATION_HTTP_RESPONSE = (key: string) =>
  createSelector(SELECT_LOCATION_STATE, (state: LocationState) => {
    return state._http[key]?.response || null;
  });

export const IS_LOADED = (key: string) =>
  createSelector(SELECT_LOCATION_STATE, (state: LocationState) => {
    return state._http[key].loaded || false;
  });

export const SELECT_SELECTED_LOCATION_ID = createSelector(
  SELECT_LOCATION_STATE,
  (state: LocationState) => state.selectedLocationId
);

export const SELECT_SELECTED_LOCATION = createSelector(
  SELECT_LOCATIONS_ENTITIES,
  SELECT_SELECTED_LOCATION_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
