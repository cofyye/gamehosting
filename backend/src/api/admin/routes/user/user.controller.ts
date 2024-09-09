import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { UserEntity } from 'src/shared/entities/user.entity';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { IDataSendResponse } from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';

import { UserService } from './user.service';

@Controller('admin/user')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(
    new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN, UserRole.SUPPORT]),
  )
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getUsers(): Promise<IDataSendResponse<UserEntity[]>> {
    try {
      return {
        success: true,
        data: await this._userService.getUsers(),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all users.',
      );
    }
  }
}
