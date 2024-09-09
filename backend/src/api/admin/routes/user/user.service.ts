import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { functions } from 'src/shared/utils/functions';

import { UserEntity } from 'src/shared/entities/user.entity';
import { UtilsService } from 'src/shared/services/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _utilsService: UtilsService,
  ) {}

  public async getUsers(): Promise<UserEntity[]> {
    try {
      return await this._userRepo.find({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          email: true,
          country: true,
          countryTag: true,
          role: true,
          money: true,
          avatar: true,
          registrationDate: true,
        },
      });
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all users.',
      );
    }
  }
}
