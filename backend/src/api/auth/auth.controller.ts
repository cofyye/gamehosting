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
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as moment from 'moment';

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
import { CheckSessionGuard } from './guards/check-session.guard';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { EmailDto } from './dtos/email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ConfirmVerificationDto } from './dtos/confirm-verification.dto';

import { UtilsService } from 'src/shared/services/utils/utils.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
    private readonly _jwtService: JwtService,
    private readonly _utilsService: UtilsService,
  ) {}

  @UseGuards(NotAuthenticatedGuard)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() body: CreateUserDto): Promise<ISendResponse> {
    try {
      await this._authService.createUser(body);

      return {
        success: true,
        message:
          'You have successfully registered. You can now verify your account before logging in.',
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
  ): Promise<
    IDataSendResponse<{ user: Partial<UserEntity>; expirationDate: Date }>
  > {
    const user: Partial<UserEntity> = await this._authService.loginUser(body);

    if (!user) {
      functions.throwHttpException(
        false,
        'Login failed. Please try again.',
        HttpStatus.UNAUTHORIZED,
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
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });

      response.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });

      const token = (await this._jwtService.verifyAsync(
        accessToken,
      )) as IJwtPayload;

      return {
        success: true,
        data: {
          user: await this._utilsService.getUserById(user.id),
          expirationDate: moment.unix(token.exp).toDate(),
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
    try {
      response.clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });
      response.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });

      return {
        success: true,
        message: 'You have successfully logged out.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'The error occurred during logout.',
      );
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/relogin')
  @HttpCode(HttpStatus.OK)
  public async relogin(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IDataSendResponse<Date>> {
    try {
      const user = request.user as UserEntity;

      const payload: IJwtPayload = { id: user.id };

      const accessToken = await this._jwtService.signAsync(payload);

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });

      const token = (await this._jwtService.verifyAsync(
        accessToken,
      )) as IJwtPayload;

      return {
        success: true,
        data: moment.unix(token.exp).toDate(),
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

  @UseGuards(CheckSessionGuard)
  @Post('/check/session')
  @HttpCode(HttpStatus.OK)
  public async checkUserSession(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<
    IDataSendResponse<{ user: Partial<UserEntity>; expirationDate: Date }>
  > {
    try {
      let loggedUser: Partial<UserEntity> = req.user;
      let accessToken = '';

      // Regenerate Access Token With Refresh Token
      if (!loggedUser) {
        try {
          const payload = (await this._jwtService.verifyAsync(
            req?.cookies?.['refresh_token'],
            {
              secret: this._configService.get<string>('JWT_REFRESH_TOKEN'),
            },
          )) as IJwtPayload;

          accessToken = await this._jwtService.signAsync({
            id: payload.id,
          });

          response.cookie('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
          });

          loggedUser = await this._utilsService.getUserById(payload.id);
        } catch (err: unknown) {}
      }

      if (loggedUser) {
        const token = (await this._jwtService.verifyAsync(
          accessToken || req?.cookies?.['access_token'],
        )) as IJwtPayload;

        return {
          success: true,
          data: {
            user: await this._utilsService.getUserById(loggedUser.id),
            expirationDate: moment.unix(token.exp).toDate(),
          },
          message: 'Success.',
        };
      } else {
        return {
          success: false,
          data: {
            user: null,
            expirationDate: null,
          },
          message: 'Success.',
        };
      }
    } catch (err: unknown) {
      return {
        success: false,
        data: {
          user: null,
          expirationDate: null,
        },
        message: 'Success.',
      };
    }
  }

  @Post('/availability/username/:username')
  @HttpCode(HttpStatus.OK)
  public async usernameAvailability(
    @Param('username') username: string,
  ): Promise<IDataSendResponse<boolean>> {
    return {
      success: true,
      data: await this._authService.usernameAvailability(username),
      message: 'Success.',
    };
  }

  @Post('/availability/email/:email')
  @HttpCode(HttpStatus.OK)
  public async emailAvailability(
    @Param('email') email: string,
  ): Promise<IDataSendResponse<boolean>> {
    return {
      success: true,
      data: await this._authService.emailAvailability(email),
      message: 'Success.',
    };
  }
}
