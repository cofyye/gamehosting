import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from 'src/shared/entities/user.entity';
import { functions } from 'src/shared/utils/functions';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
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
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info instanceof TokenExpiredError) {
      functions.throwHttpException(
        false,
        'Your session token has expired. Please log in again.',
        HttpStatus.FORBIDDEN,
      );
    } else if (info || err) {
      functions.throwHttpException(
        false,
        'You must be logged in to access this page.',
        HttpStatus.FORBIDDEN,
      );
    }

    return user as TUser;
  }
}
