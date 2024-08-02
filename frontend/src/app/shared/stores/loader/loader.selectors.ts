import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader.state';

export const SELECT_LOADER_STATE = createFeatureSelector<LoaderState>('loader');

export const IS_LOADING = (key: string) =>
  createSelector(SELECT_LOADER_STATE, (state: LoaderState) => {
    return state.loader[key] || false;
  });
