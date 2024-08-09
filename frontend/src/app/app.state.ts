import { AuthState } from './shared/stores/auth/auth.state';
import { HttpState } from './shared/stores/http/http.state';
import { LoaderState } from './shared/stores/loader/loader.state';

export interface AppState {
  auth: AuthState;
  loader: LoaderState;
  http: HttpState;
}
