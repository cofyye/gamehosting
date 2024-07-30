import { createAction, props } from '@ngrx/store';

export const startLoading = createAction(
  '[Loader] Start Loading',
  props<{ key: string }>()
);

export const stopLoading = createAction(
  '[Loader] Stop Loading',
  props<{ key: string }>()
);
