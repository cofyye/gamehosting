import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { saveAuth } from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(saveAuth, (state, { auth }) => {
    const newUser = { ...state.auth, ...auth };

    return {
      ...state,
      auth: newUser,
    };
  })
);
