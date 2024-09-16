import { createReducer, on } from '@ngrx/store';
import { initialState, serverAdapter } from './server.state';
import {
  DELETE_SERVER_RESPONSE,
  REMOVE_SELECTED_SERVER,
  LOAD_SERVERS_RESPONSE,
  SET_SELECTED_SERVER,
} from './server.actions';

export const serverReducer = createReducer(
  initialState,
  on(LOAD_SERVERS_RESPONSE, (state, { data }) => {
    return serverAdapter.setAll(data, state);
  }),
  on(DELETE_SERVER_RESPONSE, (state, { id }) => {
    return serverAdapter.removeOne(id, state);
  }),
  on(SET_SELECTED_SERVER, (state, { id }) => ({
    ...state,
    selectedServerId: id,
  })),
  on(REMOVE_SELECTED_SERVER, (state) => ({
    ...state,
    selectedServerId: null,
  }))
);
