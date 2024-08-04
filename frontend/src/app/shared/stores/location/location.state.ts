import { ILocation } from '../../models/location.model';

export interface LocationState {
  locations: ILocation[];
}

export const initialState: LocationState = {
  locations: [],
};
