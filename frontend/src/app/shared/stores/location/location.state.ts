import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ILocationResponse } from '../../models/location/location-response.model';
import { IAcceptResponse } from '../../models/response.model';

export interface LocationState extends EntityState<ILocationResponse> {
  selectedLocationId: string | null;
  response: IAcceptResponse | null;
  loaded: boolean;
}

export const locationAdapter: EntityAdapter<ILocationResponse> =
  createEntityAdapter<ILocationResponse>();

export const initialState: LocationState = locationAdapter.getInitialState({
  selectedLocationId: null,
  response: null,
  loaded: false,
});
