import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('user');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);

export const selectUserRole = createSelector(selectUser, (auth) => auth.role);

export const selectUserId = createSelector(selectUser, (auth) => auth.id);
