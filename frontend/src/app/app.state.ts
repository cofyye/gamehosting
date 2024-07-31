import { authReducer } from './features/auth/store/auth.reducer';
import { AuthState } from './features/auth/store/auth.state';

import { loaderReducer } from './shared/store/loader/loader.reducer';
import { LoaderState } from './shared/store/loader/loader.state';

export interface AppState {
  auth: AuthState;
  loader: LoaderState;
}

export const appReducer = {
  auth: authReducer,
  loader: loaderReducer,
};
