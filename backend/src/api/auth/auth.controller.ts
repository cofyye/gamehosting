import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';

import { UserEntity } from 'src/shared/entities/user.entity';
import { functions } from 'src/shared/utils/functions';
import { IJwtPayload } from 'src/shared/interfaces/jwt.interface';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { EmailDto } from './dtos/email.dto';
import { ConfirmVerificationDto } from './dtos/confirm-verification.dto';

import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body() body: CreateUserDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      let avatar = req.files?.avatar;

      if (!avatar) {
        functions.throwHttpException(
          false,
          'The image field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user: UserEntity = await this._authService.createUser(body, avatar);

      if (!user) {
        functions.throwHttpException(
          false,
          'An error occurred during registration.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        success: true,
        message: 'You have successfully registered.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred during registration.',
      );
    }
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  public async loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IDataSendResponse<Pick<UserEntity, 'id' | 'role'>>> {
    const user: UserEntity = await this._authService.loginUser(body);

    if (!user) {
      functions.throwHttpException(
        false,
        'Login failed. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const payload: IJwtPayload = { id: user.id };

      const accessToken = await this._jwtService.signAsync(payload);
      const refreshToken = await this._jwtService.signAsync(payload, {
        expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
        secret: this._configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      response.cookie('access_token', accessToken, {
        httpOnly:
          this._configService.get<string>('APP_STATE') === 'development'
            ? false
            : true,
        sameSite: 'none',
        secure:
          this._configService.get<string>('APP_STATE') === 'development'
            ? false
            : true,
      });

      response.cookie('refresh_token', refreshToken, {
        httpOnly:
          this._configService.get<string>('APP_STATE') === 'development'
            ? false
            : true,
        sameSite: 'none',
        secure:
          this._configService.get<string>('APP_STATE') === 'development'
            ? false
            : true,
      });

      return {
        success: true,
        data: {
          id: user.id,
          role: user.role,
        },
        message: 'You have successfully logged in.',
      };
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while generating the token.',
      );
    }
  }

  @Post('/verification/confirm')
  @HttpCode(HttpStatus.OK)
  public async confirmVerification(
    @Query() query: ConfirmVerificationDto,
  ): Promise<ISendResponse> {
    await this._authService.confirmVerification(query);

    return {
      success: true,
      message: 'You have successfully verified your account.',
    };
  }

  @Post('/verification/resend/:email')
  @HttpCode(HttpStatus.OK)
  public async resendVerification(
    @Param() param: EmailDto,
  ): Promise<ISendResponse> {
    await this._authService.resendVerification(param);

    return {
      success: true,
      message: 'You have successfully requested a new verification code.',
    };
  }
}
