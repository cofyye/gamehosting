import { createReducer, on } from '@ngrx/store';
import { initialState, serverAdapter } from './server.state';
import {
  DELETE_SERVER_RESPONSE,
  DESELECT_SERVER,
  LOAD_SERVERS_RESPONSE,
  SELECT_SERVER,
} from './server.actions';

export const serverReducer = createReducer(
  initialState,
  on(LOAD_SERVERS_RESPONSE, (state, { data }) => {
    return serverAdapter.setAll(data, state);
  }),
  on(DELETE_SERVER_RESPONSE, (state, { data }) => {
    return serverAdapter.removeOne(data, state);
  }),
  on(SELECT_SERVER, (state, { id }) => ({
    ...state,
    selectedServerId: id,
  })),
  on(DESELECT_SERVER, (state) => ({
    ...state,
    selectedServerId: null,
  }))
);
