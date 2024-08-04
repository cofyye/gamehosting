import { authReducer } from './shared/stores/auth/auth.reducer';
import { AuthState } from './shared/stores/auth/auth.state';
import { loaderReducer } from './shared/stores/loader/loader.reducer';
import { LoaderState } from './shared/stores/loader/loader.state';
import { locationReducer } from './shared/stores/location/location.reducer';
import { LocationState } from './shared/stores/location/location.state';

export interface AppState {
  auth: AuthState;
  loader: LoaderState;
  location: LocationState;
}

export const appReducer = {
  auth: authReducer,
  loader: loaderReducer,
  location: locationReducer,
};
