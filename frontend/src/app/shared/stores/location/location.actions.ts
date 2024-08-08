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

export const ADD_LOCATION_SUCCESS = createAction(
  '[Location] Add Location Success',
  props<{ response: IAcceptResponse }>()
);

export const ADD_LOCATION_FAILURE = createAction(
  '[Location] Add Location Failure',
  props<{ error: string }>()
);

export const LOAD_LOCATIONS = createAction('[Location] Load Locations');

export const LOAD_LOCATIONS_SUCCESS = createAction(
  '[Location] Load Locations Success',
  props<{ response: IAcceptResponse; data: ILocationResponse[] }>()
);

export const LOAD_LOCATIONS_FAILURE = createAction(
  '[Location] Load Locations Failure',
  props<{ error: string }>()
);

export const SELECT_LOCATION = createAction(
  '[Location] Select Location',
  props<{ id: string }>()
);
