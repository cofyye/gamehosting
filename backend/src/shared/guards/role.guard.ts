import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '../enums/role.enum';
import { Request } from 'express';
import { UserEntity } from 'src/shared/entities/user.entity';
import { functions } from '../utils/functions';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: UserRole[]) {}

  public canActivate(context: ExecutionContext): boolean {
    try {
      const request: Request = context.switchToHttp().getRequest<Request>();
      const user: UserEntity = request.user as UserEntity;

      if (!user) {
        functions.throwHttpException(
          false,
          'User not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!this.roles.includes(user.role)) {
        functions.throwHttpException(
          false,
          'You do not have permission to access this page.',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'You do not have permission to access this page.',
      );
    }
  }
}
