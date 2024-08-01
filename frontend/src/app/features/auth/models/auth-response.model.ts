import { UserRole } from '../../../shared/enums/user.enum';

export interface ILoginResponse {
  id: string;
  role: UserRole;
  expirationDate: Date;
}
