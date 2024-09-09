import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const SELECT_AUTH_STATE = createFeatureSelector<AuthState>('auth');

export const SELECT_AUTH = createSelector(
  SELECT_AUTH_STATE,
  (state: AuthState) => state.auth
);

export const SELECT_USER = createSelector(SELECT_AUTH, (auth) => auth.user);

export const SELECT_USER_ROLE = createSelector(
  SELECT_USER,
  (user) => user?.role
);

export const SELECT_USER_ID = createSelector(SELECT_USER, (user) => user?.id);
