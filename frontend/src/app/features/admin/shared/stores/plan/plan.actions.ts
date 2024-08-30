import { createAction, props } from '@ngrx/store';
import { IPlanAddRequest } from '../../models/plan-request.model';
import { IPlanResponse } from '../../models/plan-response.model';

export const ADD_PLAN = createAction(
  '[Plan] Add Plan',
  props<{
    payload: IPlanAddRequest;
  }>()
);

export const DELETE_PLAN = createAction(
  '[Plan] Delete Plan',
  props<{
    payload: string;
  }>()
);

export const DELETE_PLAN_RESPONSE = createAction(
  '[Plan] Delete Plan Response',
  props<{ data: string }>()
);

export const LOAD_PLANS = createAction('[Plan] Load Plans');

export const LOAD_PLANS_RESPONSE = createAction(
  '[Plan] Load Plans Response',
  props<{ data: IPlanResponse[] }>()
);

export const SELECT_PLAN = createAction(
  '[Plan] Select Plan',
  props<{ id: string }>()
);

export const DESELECT_PLAN = createAction('[Plan] Deselect Plan');
