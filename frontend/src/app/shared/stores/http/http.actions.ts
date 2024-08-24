import { createAction, props } from '@ngrx/store';
import { IAcceptResponse } from '../../models/response.model';

export const SET_RESPONSE = createAction(
  '[HTTP] Set Response',
  props<{ key: string; response: IAcceptResponse }>()
);
