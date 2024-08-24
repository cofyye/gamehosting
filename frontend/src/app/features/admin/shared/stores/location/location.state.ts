import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ILocationResponse } from '../../../shared/models/location-response.model';
import { _httpResponse } from '../../../../../shared/models/response.model';

export interface LocationState extends EntityState<ILocationResponse> {
  selectedLocationId: string | null;
}

export const locationAdapter: EntityAdapter<ILocationResponse> =
  createEntityAdapter<ILocationResponse>();

export const initialState: LocationState = locationAdapter.getInitialState({
  selectedLocationId: null,
});
