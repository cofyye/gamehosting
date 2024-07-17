import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { functions } from '../utils/functions';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotAuthenticatedGuard extends AuthGuard('jwt-access') {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    let response: unknown;

    try {
      response = await this._jwtService.verifyAsync(
        req?.cookies?.['access_token'],
        {
          secret: this._configService.get<string>('JWT_ACCESS_TOKEN'),
        },
      );
    } catch (err: unknown) {}

    if (response) {
      functions.throwHttpException(
        false,
        'You must be logged out to access this page.',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
