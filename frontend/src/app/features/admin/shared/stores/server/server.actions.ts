import { createAction, props } from '@ngrx/store';
import { IServerAddRequest } from '../../models/server-request.model';
import { IServerResponse } from '../../models/server-response.model';

export const ADD_SERVER = createAction(
  '[Server] Add Server',
  props<{
    payload: IServerAddRequest;
  }>()
);

export const DELETE_SERVER = createAction(
  '[Server] Delete Server',
  props<{
    payload: string;
  }>()
);

export const DELETE_SERVER_RESPONSE = createAction(
  '[Server] Delete Server Response',
  props<{ data: string }>()
);

export const LOAD_SERVERS = createAction('[Server] Load Servers');

export const LOAD_SERVERS_RESPONSE = createAction(
  '[Server] Load Servers Response',
  props<{ data: IServerResponse[] }>()
);

export const SELECT_SERVER = createAction(
  '[Server] Select Server',
  props<{ id: string }>()
);

export const DESELECT_SERVER = createAction('[Server] Deselect Server');
