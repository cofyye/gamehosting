import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as moment from 'moment';

@Injectable()
export class EmailService {
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
  ) {}

  public async sendConfirmation(email: string, verificationToken: string) {
    try {
      await this._mailerService.sendMail({
        from: `${this._configService.get<string>('APP_NAME')} ${this._configService.get<string>('SMTP_NOREPLY_MAIL')}`,
        to: email,
        subject: `Please Verify Your Email Address`,
        template: 'confirm-email',
        context: {
          URL: this._configService.get<string>('FRONTEND_URL'),
          EMAIL: email,
          VERIFICATION_TOKEN: verificationToken,
          APP_NAME: this._configService.get<string>('APP_NAME'),
          YEAR: moment().toDate().getFullYear(),
        },
      });

      return true;
    } catch (_: unknown) {
      return false;
    }
  }

  public async sendResetPassword(email: string, passwordToken: string) {
    try {
      await this._mailerService.sendMail({
        from: `${this._configService.get<string>('APP_NAME')} ${this._configService.get<string>('SMTP_NOREPLY_MAIL')}`,
        to: email,
        subject: `Account Recovery`,
        template: 'reset-password',
        context: {
          URL: this._configService.get<string>('FRONTEND_URL'),
          EMAIL: email,
          PASSWORD_TOKEN: passwordToken,
          APP_NAME: this._configService.get<string>('APP_NAME'),
          YEAR: moment().toDate().getFullYear(),
        },
      });

      return true;
    } catch (_: unknown) {
      return false;
    }
  }

  public async sendVerifiedAccount(
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    pinCode: string,
  ) {
    try {
      await this._mailerService.sendMail({
        from: `${this._configService.get<string>('APP_NAME')} ${this._configService.get<string>('SMTP_NOREPLY_MAIL')}`,
        to: email,
        subject: `Account Successfully Verified`,
        template: 'confirmed-email',
        context: {
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
          USERNAME: username,
          PIN_CODE: pinCode,
          APP_NAME: this._configService.get<string>('APP_NAME'),
          YEAR: moment().toDate().getFullYear(),
        },
      });

      return true;
    } catch (_: unknown) {
      return false;
    }
  }
}
