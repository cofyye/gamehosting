import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader.state';

export const selectLoaderState = createFeatureSelector<LoaderState>('loader');

export const isLoading = (key: string) =>
  createSelector(
    selectLoaderState,
    (state: LoaderState) => state.loader[key] || false
  );
