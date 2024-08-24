import { createReducer, on } from '@ngrx/store';
import { initialState, machineAdapter } from './machine.state';
import {
  DELETE_MACHINE_RESPONSE,
  DESELECT_MACHINE,
  LOAD_MACHINES_RESPONSE,
  SELECT_MACHINE,
} from './machine.actions';

export const machineReducer = createReducer(
  initialState,
  on(LOAD_MACHINES_RESPONSE, (state, { data }) => {
    return machineAdapter.setAll(data, state);
  }),
  on(DELETE_MACHINE_RESPONSE, (state, { data }) => {
    return machineAdapter.removeOne(data, state);
  }),
  on(SELECT_MACHINE, (state, { id }) => ({
    ...state,
    selectedMachineId: id,
  })),
  on(DESELECT_MACHINE, (state) => ({
    ...state,
    selectedMachineId: null,
  }))
);
