import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ILocationResponse } from '../../models/location/location-response.model';
import { _httpResponse } from '../../models/response.model';

export interface LocationState extends EntityState<ILocationResponse> {
  selectedLocationId: string | null;
  _http: _httpResponse;
}

export const locationAdapter: EntityAdapter<ILocationResponse> =
  createEntityAdapter<ILocationResponse>();

export const initialState: LocationState = locationAdapter.getInitialState({
  selectedLocationId: null,
  _http: {},
});
