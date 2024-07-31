import { createAction, props } from '@ngrx/store';

export const START_LOADING = createAction(
  '[Loader] Start Loading',
  props<{ key: string }>()
);

export const STOP_LOADING = createAction(
  '[Loader] Stop Loading',
  props<{ key: string }>()
);
