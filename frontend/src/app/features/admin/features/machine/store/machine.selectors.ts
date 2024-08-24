import { createFeatureSelector, createSelector } from '@ngrx/store';
import { machineAdapter, MachineState } from './machine.state';

const { selectAll, selectEntities } = machineAdapter.getSelectors();

export const SELECT_MACHINE_STATE =
  createFeatureSelector<MachineState>('machine');

export const SELECT_MACHINES = createSelector(SELECT_MACHINE_STATE, selectAll);

export const SELECT_MACHINES_ENTITIES = createSelector(
  SELECT_MACHINE_STATE,
  selectEntities
);

export const SELECT_SELECTED_MACHINE_ID = createSelector(
  SELECT_MACHINE_STATE,
  (state: MachineState) => state.selectedMachineId
);

export const SELECT_SELECTED_MACHINE = createSelector(
  SELECT_MACHINES_ENTITIES,
  SELECT_SELECTED_MACHINE_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
