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
  UseGuards,
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

import { NotAuthenticatedGuard } from 'src/shared/guards/not-authenticated.guard';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { EmailDto } from './dtos/email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
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

  @UseGuards(NotAuthenticatedGuard)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body() body: CreateUserDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      await this._authService.createUser(body, req.files?.avatar);

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

  @UseGuards(NotAuthenticatedGuard)
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
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
        sameSite: 'none',
        secure:
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
      });

      response.cookie('refresh_token', refreshToken, {
        httpOnly:
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
        sameSite: 'none',
        secure:
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
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

  @UseGuards(NotAuthenticatedGuard)
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

  @UseGuards(NotAuthenticatedGuard)
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

  @UseGuards(NotAuthenticatedGuard)
  @Post('/password/forgot/:email')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(
    @Param() param: EmailDto,
  ): Promise<ISendResponse> {
    await this._authService.forgotPassword(param);

    return {
      success: true,
      message: 'You have successfully sent a password reset request.',
    };
  }

  // Check if the user can access the frontend page for resetting the password
  @UseGuards(NotAuthenticatedGuard)
  @Post('/password/reset')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Query() query: ResetPasswordDto,
  ): Promise<ISendResponse> {
    await this._authService.resetPassword(query);

    return {
      success: true,
      message: 'Success.',
    };
  }

  @UseGuards(NotAuthenticatedGuard)
  @Post('/password/change')
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @Body() body: ChangePasswordDto,
  ): Promise<ISendResponse> {
    await this._authService.changePassword(body);

    return {
      success: true,
      message: 'You have successfully changed your password.',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  public async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<ISendResponse> {
    response.clearCookie('access_token', {
      httpOnly:
        this._configService.get<string>('APP_STATE') === 'production'
          ? true
          : false,
      sameSite: 'none',
      secure:
        this._configService.get<string>('APP_STATE') === 'production'
          ? true
          : false,
    });
    response.clearCookie('refresh_token', {
      httpOnly:
        this._configService.get<string>('APP_STATE') === 'production'
          ? true
          : false,
      sameSite: 'none',
      secure:
        this._configService.get<string>('APP_STATE') === 'production'
          ? true
          : false,
    });

    return {
      success: true,
      message: 'Success.',
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/relogin')
  @HttpCode(HttpStatus.OK)
  public async relogin(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ISendResponse> {
    try {
      const user = request.user as UserEntity;

      const payload: IJwtPayload = { id: user.id };

      const accessToken = await this._jwtService.signAsync(payload);

      response.cookie('access_token', accessToken, {
        httpOnly:
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
        sameSite: 'none',
        secure:
          this._configService.get<string>('APP_STATE') === 'production'
            ? true
            : false,
      });

      return {
        success: true,
        message: 'Success.',
      };
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while generating the token.',
      );
    }
  }
}
