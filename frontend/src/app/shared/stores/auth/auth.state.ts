import { ILoginStatus } from '../../../shared/models/user.model';

export interface AuthState {
  auth: ILoginStatus;
}

export const initialState: AuthState = {
  auth: {
    user: undefined,
    fetched: false,
    loggedIn: false,
    expirationDate: undefined,
  },
};
