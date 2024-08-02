import { authReducer } from './shared/stores/auth/auth.reducer';
import { AuthState } from './shared/stores/auth/auth.state';
import { loaderReducer } from './shared/stores/loader/loader.reducer';
import { LoaderState } from './shared/stores/loader/loader.state';

export interface AppState {
  auth: AuthState;
  loader: LoaderState;
}

export const appReducer = {
  auth: authReducer,
  loader: loaderReducer,
};
