import { createAction, props } from '@ngrx/store';
import { IAcceptResponse } from '../../models/response.model';

export const SET_FULL_RESPONSE = createAction(
  '[HTTP] Set Full Response',
  props<{ key: string; response: IAcceptResponse; load: boolean }>()
);

export const SET_RESPONSE = createAction(
  '[HTTP] Set Response',
  props<{ key: string; response: IAcceptResponse }>()
);
