import { UserRole } from '../enums/user.enum';

export interface ILoginResponse {
  id: string;
  role: UserRole;
  expirationDate: Date;
}
