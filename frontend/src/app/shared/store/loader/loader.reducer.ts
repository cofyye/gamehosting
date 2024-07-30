import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './loader.actions';
import { initialState } from './loader.state';

export const loaderReducer = createReducer(
  initialState,
  on(startLoading, (state, { key }) => ({
    ...state,
    [key]: true,
  })),
  on(stopLoading, (state, { key }) => ({
    ...state,
    [key]: false,
  }))
);
