import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { _httpResponse } from '../../../../../shared/models/response.model';
import { IPlanResponse } from '../../models/plan-response.model';

export interface PlanState extends EntityState<IPlanResponse> {
  selectedPlanId: string | null;
}

export const planAdapter: EntityAdapter<IPlanResponse> =
  createEntityAdapter<IPlanResponse>();

export const initialState: PlanState = planAdapter.getInitialState({
  selectedPlanId: null,
});
