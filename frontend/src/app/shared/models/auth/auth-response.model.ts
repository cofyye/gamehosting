import { IUser } from '../user.model';

export interface ILoginResponse {
  user: IUser;
  expirationDate: Date;
}
