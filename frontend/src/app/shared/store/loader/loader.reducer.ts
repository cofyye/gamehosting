import { createReducer, on } from '@ngrx/store';
import { START_LOADING, STOP_LOADING } from './loader.actions';
import { initialState } from './loader.state';

export const loaderReducer = createReducer(
  initialState,
  on(START_LOADING, (state, { key }) => ({
    ...state,
    loader: {
      [key]: true,
    },
  })),
  on(STOP_LOADING, (state, { key }) => ({
    ...state,
    loader: {
      [key]: false,
    },
  }))
);
