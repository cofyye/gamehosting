import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { functions } from 'src/shared/utils/functions';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { GameEntity } from 'src/shared/entities/game.entity';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    @InjectRepository(MachineEntity)
    private readonly _machineRepo: Repository<MachineEntity>,
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
  ) {}

  public async locationExists(locationId: string): Promise<boolean> {
    try {
      const count = await this._locationRepo.count({
        where: { id: locationId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the location exists.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async machineExists(machineId: string): Promise<boolean> {
    try {
      const count = await this._machineRepo.count({
        where: { id: machineId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the machine exists.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async gameExists(gameId: string): Promise<boolean> {
    try {
      const count = await this._gameRepo.count({
        where: { id: gameId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the game exists.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
