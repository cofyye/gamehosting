import { createReducer, on } from '@ngrx/store';
import { initialState, machineAdapter } from './machine.state';
import {
  DELETE_MACHINE_RESPONSE,
  REMOVE_SELECTED_MACHINE,
  LOAD_MACHINES_RESPONSE,
  SET_SELECT_MACHINE,
} from './machine.actions';

export const machineReducer = createReducer(
  initialState,
  on(LOAD_MACHINES_RESPONSE, (state, { data }) => {
    return machineAdapter.setAll(data, state);
  }),
  on(DELETE_MACHINE_RESPONSE, (state, { id }) => {
    return machineAdapter.removeOne(id, state);
  }),
  on(SET_SELECT_MACHINE, (state, { id }) => ({
    ...state,
    selectedMachineId: id,
  })),
  on(REMOVE_SELECTED_MACHINE, (state) => ({
    ...state,
    selectedMachineId: null,
  }))
);
