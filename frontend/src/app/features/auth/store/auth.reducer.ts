import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { SAVE_AUTH } from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(SAVE_AUTH, (state, { auth }) => {
    const newUser = { ...state.auth, ...auth };

    return {
      ...state,
      auth: newUser,
    };
  })
);
