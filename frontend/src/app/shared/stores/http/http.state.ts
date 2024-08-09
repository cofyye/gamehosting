import { _httpResponse } from '../../models/response.model';

export interface HttpState {
  http: _httpResponse;
}

export const initialState: HttpState = {
  http: {},
};
