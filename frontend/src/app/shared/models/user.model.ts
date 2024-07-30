import { UserRole } from '../enums/user.enum';

export interface ILoginStatus {
  id: string;
  role: UserRole;
  fetched: boolean;
  loggedIn: boolean;
}
