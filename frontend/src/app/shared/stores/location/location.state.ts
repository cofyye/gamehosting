import { ILocation } from '../../models/location/location.model';
import { IAcceptResponse } from '../../models/response.model';

export interface LocationState {
  locations: ILocation[];
  response: IAcceptResponse | null;
  loaded: boolean;
}

export const initialState: LocationState = {
  locations: [],
  response: null,
  loaded: false,
};
