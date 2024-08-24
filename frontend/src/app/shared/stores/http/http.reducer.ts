import { createReducer, on } from '@ngrx/store';
import { SET_RESPONSE } from './http.actions';
import { initialState } from './http.state';

export const httpReducer = createReducer(
  initialState,
  on(SET_RESPONSE, (state, { key, response }) => ({
    ...state,
    http: {
      ...state.http,
      [key]: {
        ...state.http[key],
        response: {
          success: response.success,
          message: response.message,
        },
      },
    },
  }))
);
