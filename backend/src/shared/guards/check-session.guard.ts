import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CheckSessionGuard extends AuthGuard('jwt-access') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = UserEntity>(
    err: unknown,
    user: UserEntity,
    info: unknown,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    return user as TUser;
  }
}
