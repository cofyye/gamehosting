import { createAction, props } from '@ngrx/store';
import { ILocationAddRequest } from '../../../shared/models/location-request.model';
import { ILocationResponse } from '../../../shared/models/location-response.model';

export const ADD_LOCATION = createAction(
  '[Location] Add Location',
  props<{
    payload: ILocationAddRequest;
  }>()
);

export const DELETE_LOCATION = createAction(
  '[Location] Delete Location',
  props<{
    payload: string;
  }>()
);

export const DELETE_LOCATION_RESPONSE = createAction(
  '[Location] Delete Location Response',
  props<{ data: string }>()
);

export const LOAD_LOCATIONS = createAction('[Location] Load Locations');

export const LOAD_LOCATIONS_RESPONSE = createAction(
  '[Location] Load Locations Response',
  props<{ data: ILocationResponse[] }>()
);

export const LOAD_LOCATION = createAction(
  '[Location] Load Location',
  props<{ id: string }>()
);

export const LOAD_LOCATION_RESPONSE = createAction(
  '[Location] Load Location Response',
  props<{ data: ILocationResponse }>()
);

export const SET_SELECTED_LOCATION = createAction(
  '[Location] Set Selected Location',
  props<{ id: string }>()
);

export const REMOVE_SELECTED_LOCATION = createAction(
  '[Location] Remove Selected Location'
);
