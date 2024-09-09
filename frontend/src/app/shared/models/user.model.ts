import { UserRole } from '../enums/user.enum';

export interface ILoginStatus {
  user?: IUser;
  fetched: boolean;
  loggedIn: boolean;
  expirationDate?: Date;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  countryTag: string;
  role: UserRole;
  money: string;
  avatar: string;
  registrationDate: Date;
}
