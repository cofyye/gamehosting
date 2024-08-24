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
    payload: string;
  }>()
);

export const DELETE_MACHINE_RESPONSE = createAction(
  '[Machine] Delete Machine Response',
  props<{ data: string }>()
);

export const LOAD_MACHINES = createAction('[Machines] Load Machines');

export const LOAD_MACHINES_RESPONSE = createAction(
  '[Machine] Load Machines Response',
  props<{ data: IMachineResponse[] }>()
);

export const SELECT_MACHINE = createAction(
  '[Machine] Select Machine',
  props<{ id: string }>()
);

export const DESELECT_MACHINE = createAction('[Machine] Deselect Machine');
