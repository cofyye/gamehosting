import { createAction, props } from '@ngrx/store';
import { IUserAddRequest } from '../../models/user-request.model';
import { IUserResponse } from '../../models/user-response.model';

export const ADD_USER = createAction(
  '[User] Add User',
  props<{
    payload: IUserAddRequest;
  }>()
);

export const DELETE_USER = createAction(
  '[User] Delete User',
  props<{
    id: string;
  }>()
);

export const DELETE_USER_RESPONSE = createAction(
  '[User] Delete User Response',
  props<{ id: string }>()
);

export const LOAD_USERS = createAction('[User] Load Users');

export const LOAD_USERS_RESPONSE = createAction(
  '[User] Load Users Response',
  props<{ data: IUserResponse[] }>()
);

export const SET_SELECTED_USER = createAction(
  '[User] Set Selected User',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_USER = createAction('[User] Remove Selected User');
