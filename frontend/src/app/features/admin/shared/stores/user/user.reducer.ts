import { createReducer, on } from '@ngrx/store';
import { initialState, userAdapter } from './user.state';
import {
  DELETE_USER_RESPONSE,
  DESELECT_USER,
  LOAD_USERS_RESPONSE,
  SELECT_USER,
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(LOAD_USERS_RESPONSE, (state, { data }) => {
    return userAdapter.setAll(data, state);
  }),
  on(DELETE_USER_RESPONSE, (state, { data }) => {
    return userAdapter.removeOne(data, state);
  }),
  on(SELECT_USER, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),
  on(DESELECT_USER, (state) => ({
    ...state,
    selectedUserId: null,
  }))
);
