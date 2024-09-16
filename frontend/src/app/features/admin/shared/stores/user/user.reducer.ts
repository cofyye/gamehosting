import { createReducer, on } from '@ngrx/store';
import { initialState, userAdapter } from './user.state';
import {
  DELETE_USER_RESPONSE,
  REMOVE_SELECTED_USER,
  LOAD_USERS_RESPONSE,
  SET_SELECTED_USER,
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(LOAD_USERS_RESPONSE, (state, { data }) => {
    return userAdapter.setAll(data, state);
  }),
  on(DELETE_USER_RESPONSE, (state, { id }) => {
    return userAdapter.removeOne(id, state);
  }),
  on(SET_SELECTED_USER, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),
  on(REMOVE_SELECTED_USER, (state) => ({
    ...state,
    selectedUserId: null,
  }))
);
