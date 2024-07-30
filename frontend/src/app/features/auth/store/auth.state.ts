import { UserRole } from '../../../shared/enums/user.enum';
import { ILoginStatus } from '../../../shared/models/user.model';

export interface AuthState {
  auth: ILoginStatus;
}

export const initialState: AuthState = {
  auth: {
    id: '',
    role: UserRole.USER,
    fetched: false,
    loggedIn: false,
  },
};
