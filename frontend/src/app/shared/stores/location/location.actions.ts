import { createAction, props } from '@ngrx/store';
import { ILocationAddRequest } from '../../models/location/location-request.model';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../models/response.model';
import { ILocation } from '../../models/location/location.model';

export const LOCATION_ADD = createAction(
  '[Auth] Location Add',
  props<{
    payload: ILocationAddRequest;
  }>()
);

export const LOCATION_ADD_SUCCESS = createAction(
  '[Auth] Location Add Success',
  props<{ response: IAcceptResponse }>()
);

export const LOCATION_ADD_FAILURE = createAction(
  '[Auth] Location Add Failure',
  props<{ error: string }>()
);

export const LOCATIONS_LOAD = createAction('[Auth] Locations Load');

export const LOCATIONS_LOAD_SUCCESS = createAction(
  '[Auth] Locations Load Success',
  props<{ response: IAcceptResponse; data: ILocation[] }>()
);

export const LOCATIONS_LOAD_FAILURE = createAction(
  '[Auth] Locations Load Failure',
  props<{ error: string }>()
);
