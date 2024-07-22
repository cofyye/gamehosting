import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PassportModule } from '@nestjs/passport';

import { join } from 'path';

import { UserEntity } from './shared/entities/user.entity';
import { LocationEntity } from './shared/entities/location.entity';
import { GameEntity } from './shared/entities/game.entity';
import { MachineEntity } from './shared/entities/machine.entity';
import { MachineGamesEntity } from './shared/entities/machine-games.entity';
import { ModEntity } from './shared/entities/mod.entity';

import { AuthModule } from './api/auth/auth.module';
import { AdminModule } from './api/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOSTNAME'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          synchronize: true,
          entities: [
            UserEntity,
            LocationEntity,
            GameEntity,
            MachineEntity,
            MachineGamesEntity,
            ModEntity,
          ],
        };
      },
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('SMTP_HOSTNAME'),
            port: parseInt(configService.get<string>('SMTP_PORT')),
            secure: false,
            logger: false,
            debug: false,
            auth: {
              user: configService.get<string>('SMTP_USERNAME'),
              pass: configService.get<string>('SMTP_PASSWORD'),
            },
          },
          template: {
            dir: join(__dirname, './shared/services/email/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    }),
    AuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
