import { AuthState } from './shared/stores/auth/auth.state';
import { LoaderState } from './shared/stores/loader/loader.state';
import { LocationState } from './shared/stores/location/location.state';

export interface AppState {
  auth: AuthState;
  loader: LoaderState;
  location: LocationState;
}
