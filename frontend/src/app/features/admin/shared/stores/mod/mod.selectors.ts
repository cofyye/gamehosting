import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modAdapter, ModState } from './mod.state';

const { selectAll, selectEntities } = modAdapter.getSelectors();

export const SELECT_MOD_STATE = createFeatureSelector<ModState>('mod');

export const SELECT_MODS = createSelector(SELECT_MOD_STATE, selectAll);

export const SELECT_MODS_ENTITIES = createSelector(
  SELECT_MOD_STATE,
  selectEntities
);

export const SELECT_SELECTED_MOD_ID = createSelector(
  SELECT_MOD_STATE,
  (state: ModState) => state.selectedModId
);

export const SELECT_SELECTED_MOD = createSelector(
  SELECT_MODS_ENTITIES,
  SELECT_SELECTED_MOD_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
