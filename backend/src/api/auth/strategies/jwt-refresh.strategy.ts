import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { functions } from 'src/shared/utils/functions';
import { IJwtPayload } from 'src/shared/interfaces/jwt.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['refresh_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN'),
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    try {
      const user: UserEntity = await this._userRepo.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'Sorry, you do not have permission to access this page.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'Sorry, you do not have permission to access this page.',
      );
    }
  }
}
