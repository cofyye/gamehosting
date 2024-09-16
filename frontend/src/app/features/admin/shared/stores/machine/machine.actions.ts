import { createAction, props } from '@ngrx/store';
import { IMachineAddRequest } from '../../../shared/models/machine-request.model';
import { IMachineResponse } from '../../../shared/models/machine-response.model';

export const ADD_MACHINE = createAction(
  '[Machine] Add Machine',
  props<{
    payload: IMachineAddRequest;
  }>()
);

export const DELETE_MACHINE = createAction(
  '[Machine] Delete Machine',
  props<{
    id: string;
  }>()
);

export const DELETE_MACHINE_RESPONSE = createAction(
  '[Machine] Delete Machine Response',
  props<{ id: string }>()
);

export const LOAD_MACHINES = createAction('[Machine] Load Machines');

export const LOAD_MACHINES_RESPONSE = createAction(
  '[Machine] Load Machines Response',
  props<{ data: IMachineResponse[] }>()
);

export const SET_SELECT_MACHINE = createAction(
  '[Machine] Set Selected Machine',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_MACHINE = createAction(
  '[Machine] Remove Selected Machine'
);
