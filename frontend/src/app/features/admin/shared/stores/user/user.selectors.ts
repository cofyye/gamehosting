import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.state';

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const SELECT_USER_STATE = createFeatureSelector<UserState>('user');

export const SELECT_USERS = createSelector(SELECT_USER_STATE, selectAll);

export const SELECT_USERS_ENTITIES = createSelector(
  SELECT_USER_STATE,
  selectEntities
);

export const SELECT_SELECTED_USER_ID = createSelector(
  SELECT_USER_STATE,
  (state: UserState) => state.selectedUserId
);

export const SELECT_SELECTED_USER = createSelector(
  SELECT_USERS_ENTITIES,
  SELECT_SELECTED_USER_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
