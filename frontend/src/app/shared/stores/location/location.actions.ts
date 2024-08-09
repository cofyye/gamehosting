import { createAction, props } from '@ngrx/store';
import { ILocationAddRequest } from '../../models/location/location-request.model';
import { IAcceptResponse } from '../../models/response.model';
import { ILocationResponse } from '../../models/location/location-response.model';

export const ADD_LOCATION = createAction(
  '[Location] Add Location',
  props<{
    payload: ILocationAddRequest;
  }>()
);

export const ADD_LOCATION_RESPONSE = createAction(
  '[Location] Add Location Response',
  props<{ response: IAcceptResponse }>()
);

export const DELETE_LOCATION = createAction(
  '[Location] Delete Location',
  props<{
    payload: string;
  }>()
);

export const DELETE_LOCATION_RESPONSE = createAction(
  '[Location] Delete Location Response',
  props<{ response: IAcceptResponse; data: string }>()
);

export const LOAD_LOCATIONS = createAction('[Location] Load Locations');

export const LOAD_LOCATIONS_RESPONSE = createAction(
  '[Location] Load Locations Response',
  props<{ response: IAcceptResponse; data: ILocationResponse[] }>()
);

export const SELECT_LOCATION = createAction(
  '[Location] Select Location',
  props<{ id: string }>()
);

export const DESELECT_LOCATION = createAction('[Location] Deselect Location');
