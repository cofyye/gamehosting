import { createFeatureSelector, createSelector } from '@ngrx/store';
import { planAdapter, PlanState } from './plan.state';

const { selectAll, selectEntities } = planAdapter.getSelectors();

export const SELECT_PLAN_STATE = createFeatureSelector<PlanState>('plan');

export const SELECT_PLANS = createSelector(SELECT_PLAN_STATE, selectAll);

export const SELECT_PLANS_ENTITIES = createSelector(
  SELECT_PLAN_STATE,
  selectEntities
);

export const SELECT_SELECTED_PLAN_ID = createSelector(
  SELECT_PLAN_STATE,
  (state: PlanState) => state.selectedPlanId
);

export const SELECT_SELECTED_PLAN = createSelector(
  SELECT_PLANS_ENTITIES,
  SELECT_SELECTED_PLAN_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
