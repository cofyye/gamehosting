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
    id: string;
  }>()
);

export const DELETE_PLAN_RESPONSE = createAction(
  '[Plan] Delete Plan Response',
  props<{ id: string }>()
);

export const LOAD_PLANS = createAction('[Plan] Load Plans');

export const LOAD_PLANS_RESPONSE = createAction(
  '[Plan] Load Plans Response',
  props<{ data: IPlanResponse[] }>()
);

export const LOAD_PLANS_BY_GAME_ID = createAction(
  '[Game] Load Plans By Game Id',
  props<{
    id: string;
  }>()
);

export const LOAD_PLANS_BY_GAME_ID_RESPONSE = createAction(
  '[Game] Load Plans By Game Id Response',
  props<{ data: IPlanResponse[] }>()
);

export const SET_SELECTED_PLAN = createAction(
  '[Plan] Set Selected Plan',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_PLAN = createAction('[Plan] Set Selected Plan');
