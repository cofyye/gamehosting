import { createAction, props } from '@ngrx/store';
import { ILocationAddRequest } from '../../models/location/location-request.model';

export const LOCATION_ADD = createAction(
  '[Auth] Location Add',
  props<{
    payload: ILocationAddRequest;
  }>()
);

export const LOCATION_ADD_SUCCESS = createAction('[Auth] Location Add Success');

export const LOCATION_ADD_FAILURE = createAction(
  '[Auth] Location Add Failure',
  props<{ error: string }>()
);
