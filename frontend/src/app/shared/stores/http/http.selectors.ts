import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HttpState } from './http.state';

export const SELECT_HTTP_STATE = createFeatureSelector<HttpState>('http');

export const SELECT_HTTP_RESPONSE = (key: string) =>
  createSelector(SELECT_HTTP_STATE, (state: HttpState) => {
    return state.http[key]?.response || null;
  });

export const IS_HTTP_LOADED = (key: string) =>
  createSelector(SELECT_HTTP_STATE, (state: HttpState) => {
    return state.http[key]?.load || false;
  });
