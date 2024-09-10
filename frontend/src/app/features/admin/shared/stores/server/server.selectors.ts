import { createFeatureSelector, createSelector } from '@ngrx/store';
import { serverAdapter, ServerState } from './server.state';

const { selectAll, selectEntities } = serverAdapter.getSelectors();

export const SELECT_SERVER_STATE = createFeatureSelector<ServerState>('server');

export const SELECT_SERVERS = createSelector(SELECT_SERVER_STATE, selectAll);

export const SELECT_SERVERS_ENTITIES = createSelector(
  SELECT_SERVER_STATE,
  selectEntities
);

export const SELECT_SELECTED_SERVER_ID = createSelector(
  SELECT_SERVER_STATE,
  (state: ServerState) => state.selectedServerId
);

export const SELECT_SELECTED_SERVER = createSelector(
  SELECT_SERVERS_ENTITIES,
  SELECT_SELECTED_SERVER_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
