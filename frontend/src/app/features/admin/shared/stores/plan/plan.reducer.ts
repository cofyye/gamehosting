import { createReducer, on } from '@ngrx/store';
import { initialState, planAdapter } from './plan.state';
import {
  DELETE_PLAN_RESPONSE,
  DESELECT_PLAN,
  LOAD_PLANS_RESPONSE,
  SELECT_PLAN,
} from './plan.actions';

export const planReducer = createReducer(
  initialState,
  on(LOAD_PLANS_RESPONSE, (state, { data }) => {
    return planAdapter.setAll(data, state);
  }),
  on(DELETE_PLAN_RESPONSE, (state, { data }) => {
    return planAdapter.removeOne(data, state);
  }),
  on(SELECT_PLAN, (state, { id }) => ({
    ...state,
    selectedPlanId: id,
  })),
  on(DESELECT_PLAN, (state) => ({
    ...state,
    selectedPlanId: null,
  }))
);
