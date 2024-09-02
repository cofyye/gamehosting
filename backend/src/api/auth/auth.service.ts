import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/shared/entities/user.entity';
import { functions } from 'src/shared/utils/functions';
import { EmailService } from 'src/shared/services/email/email.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ConfirmVerificationDto } from './dtos/confirm-verification.dto';
import { EmailDto } from './dtos/email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _emailService: EmailService,
  ) {}

  public async createUser(body: CreateUserDto): Promise<void> {
    try {
      let user = await this._userRepo.findOne({
        where: [{ email: body.email }, { username: body.username }],
      });

      if (user?.email === body.email) {
        functions.throwHttpException(
          false,
          'A user with this email address already exists.',
          HttpStatus.CONFLICT,
        );
      }

      if (user?.username === body.username) {
        functions.throwHttpException(
          false,
          'A user with this username already exists.',
          HttpStatus.CONFLICT,
        );
      }

      user = new UserEntity();
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.email = body.email;
      user.username = body.username;
      user.password = body.password;
      user.pinCode = functions.generatePinCode();
      user.country = body.country;
      user.countryTag = body.countryTag;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);

      user.password = password;
      user.verificationToken = functions.generateCode(6);
      user.verificationExpDate = moment().add(1, 'day').toDate();

      if (
        !(await this._emailService.sendConfirmation(
          user.email,
          user.verificationToken,
        ))
      ) {
        functions.throwHttpException(
          false,
          'An error occurred while sending the verification code.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this._userRepo.save(this._userRepo.create(user));
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred during registration.',
      );
    }
  }

  public async loginUser(body: LoginUserDto): Promise<UserEntity> {
    try {
      const user = await this._userRepo.findOne({
        where: [{ email: body.email }],
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'Invalid email or password.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!user.verified) {
        functions.throwHttpExceptionData<{ verified: boolean }>(
          false,
          { verified: false },
          'Please verify your account.',
          HttpStatus.FORBIDDEN,
        );
      }

      if (!user.active) {
        functions.throwHttpException(
          false,
          'Your account has been deactivated.',
          HttpStatus.FORBIDDEN,
        );
      }

      const isMatched = await bcrypt.compare(body.password, user.password);

      if (!isMatched) {
        functions.throwHttpException(
          false,
          'Invalid email or password.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'Login failed. Please try again.',
      );
    }
  }

  public async confirmVerification(
    query: ConfirmVerificationDto,
  ): Promise<boolean> {
    try {
      const user = await this._userRepo.findOne({
        where: {
          email: query.email,
          verificationToken: query.token,
        },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'Invalid verification code. Please try again.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (user.verified) {
        functions.throwHttpException(
          false,
          'This account is already verified.',
          HttpStatus.CONFLICT,
        );
      }

      if (moment().isAfter(user.verificationExpDate)) {
        functions.throwHttpException(
          false,
          'Your verification code has expired. Please request a new one.',
          HttpStatus.GONE,
        );
      }

      user.verificationToken = null;
      user.verificationExpDate = null;
      user.verified = true;

      await this._userRepo.save(user);

      return true;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while verifying the account.',
      );
    }
  }

  public async resendVerification(param: EmailDto): Promise<boolean> {
    try {
      const user = await this._userRepo.findOne({
        where: {
          email: param.email,
        },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'An account with this email address does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (user.verified) {
        functions.throwHttpException(
          false,
          'This account is already verified.',
          HttpStatus.CONFLICT,
        );
      }

      user.verificationToken = functions.generateCode(6);
      user.verificationExpDate = moment().add(1, 'day').toDate();

      await this._userRepo.save(user);

      if (
        !(await this._emailService.sendConfirmation(
          user.email,
          user.verificationToken,
        ))
      ) {
        functions.throwHttpException(
          false,
          'An error occurred while sending the verification code.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return true;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while sending the verification code.',
      );
    }
  }

  public async forgotPassword(param: EmailDto) {
    try {
      const user = await this._userRepo.findOne({
        where: {
          email: param.email,
        },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'An account with this email address does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      user.passwordToken = functions.generateCode(12);
      user.passwordExpDate = moment().add(2, 'hours').toDate();

      await this._userRepo.save(user);

      if (
        !(await this._emailService.sendResetPassword(
          user.email,
          user.passwordToken,
        ))
      ) {
        functions.throwHttpException(
          false,
          'An error occurred while sending the password reset request.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while sending the password reset request.',
      );
    }
  }

  public async resetPassword(query: ResetPasswordDto): Promise<boolean> {
    try {
      const user = await this._userRepo.findOne({
        where: {
          email: query.email,
          passwordToken: query.token,
        },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'Invalid password reset token. Please try again.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (moment().isAfter(user.passwordExpDate)) {
        functions.throwHttpException(
          false,
          'Your password reset token has expired. Please request a new one.',
          HttpStatus.GONE,
        );
      }

      return true;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while verifying the password reset token.',
      );
    }
  }

  public async changePassword(body: ChangePasswordDto) {
    try {
      if (body.password !== body.confirmPassword) {
        functions.throwHttpException(
          false,
          'Passwords do not match.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this._userRepo.findOne({
        where: {
          email: body.email,
          passwordToken: body.token,
        },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'Invalid password reset token. Please try again.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (moment().isAfter(user.passwordExpDate)) {
        functions.throwHttpException(
          false,
          'Your password reset token has expired. Please request a new one.',
          HttpStatus.GONE,
        );
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);

      user.password = password;
      user.passwordToken = null;
      user.passwordExpDate = null;

      await this._userRepo.save(user);

      return true;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while changing the password.',
      );
    }
  }
}
