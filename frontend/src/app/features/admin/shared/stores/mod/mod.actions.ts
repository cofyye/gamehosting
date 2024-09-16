import { createAction, props } from '@ngrx/store';
import { IModAddRequest } from '../../models/mod-request.model';
import { IModResponse } from '../../models/mod-response.model';

export const ADD_MOD = createAction(
  '[Mod] Add Mod',
  props<{
    payload: IModAddRequest;
  }>()
);

export const DELETE_MOD = createAction(
  '[Mod] Delete Mod',
  props<{
    id: string;
  }>()
);

export const DELETE_MOD_RESPONSE = createAction(
  '[Mod] Delete Mod Response',
  props<{ id: string }>()
);

export const LOAD_MODS = createAction('[Mod] Load Mods');

export const LOAD_MODS_RESPONSE = createAction(
  '[Mod] Load Mods Response',
  props<{ data: IModResponse[] }>()
);

export const LOAD_MODS_BY_GAME_ID = createAction(
  '[Game] Load Mods By Game Id',
  props<{
    id: string;
  }>()
);

export const LOAD_MODS_BY_GAME_ID_RESPONSE = createAction(
  '[Game] Load Mods By Game Id Response',
  props<{ data: IModResponse[] }>()
);

export const SET_SELECTED_MOD = createAction(
  '[Mod] Set Selected Mod',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_MOD = createAction('[Mod] Remove Selected Mod');
