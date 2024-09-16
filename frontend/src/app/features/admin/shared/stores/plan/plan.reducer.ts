import { createReducer, on } from '@ngrx/store';
import { initialState, planAdapter } from './plan.state';
import {
  DELETE_PLAN_RESPONSE,
  REMOVE_SELECTED_PLAN,
  LOAD_PLANS_BY_GAME_ID_RESPONSE,
  LOAD_PLANS_RESPONSE,
  SET_SELECTED_PLAN,
} from './plan.actions';

export const planReducer = createReducer(
  initialState,
  on(LOAD_PLANS_RESPONSE, (state, { data }) => {
    return planAdapter.setAll(data, state);
  }),
  on(LOAD_PLANS_BY_GAME_ID_RESPONSE, (state, { data }) => {
    return planAdapter.setAll(data, state);
  }),
  on(DELETE_PLAN_RESPONSE, (state, { id }) => {
    return planAdapter.removeOne(id, state);
  }),
  on(SET_SELECTED_PLAN, (state, { id }) => ({
    ...state,
    selectedPlanId: id,
  })),
  on(REMOVE_SELECTED_PLAN, (state) => ({
    ...state,
    selectedPlanId: null,
  }))
);
