import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { functions } from 'src/shared/utils/functions';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { GameEntity } from 'src/shared/entities/game.entity';
import { MachineGamesEntity } from 'src/shared/entities/machine-games.entity';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    @InjectRepository(MachineEntity)
    private readonly _machineRepo: Repository<MachineEntity>,
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
    @InjectRepository(MachineGamesEntity)
    private readonly _machineGamesRepo: Repository<MachineGamesEntity>,
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

  public validateProvidedGamesForMachine(games: string): string[] {
    try {
      const _games = JSON.parse(games) as string[];

      if (_games.length < 1) {
        functions.throwHttpException(
          false,
          'You must select at least one game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (_games.length > 10) {
        functions.throwHttpException(
          false,
          'You can select up to 10 games.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return _games;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'The games are not provided in a valid JSON format.',
      );
    }
  }

  public async addGamesForMachines(
    machine: MachineEntity,
    games: string[],
  ): Promise<void> {
    try {
      for (const gameId of games) {
        const game = await this._gameRepo.findOne({
          where: {
            id: gameId,
          },
        });

        if (!game) {
          functions.throwHttpException(
            false,
            `Game with ID ${gameId} not found.`,
            HttpStatus.NOT_FOUND,
          );
        }

        const gameExistInMachineGameDb = await this._machineGamesRepo.findOne({
          where: {
            machineId: machine.id,
            gameId: gameId,
          },
        });

        if (gameExistInMachineGameDb) {
          functions.throwHttpException(
            false,
            `Game ${game.name} has already been added to this machine.`,
            HttpStatus.CONFLICT,
          );
        }

        const machineGame = new MachineGamesEntity();
        machineGame.machineId = machine.id;
        machineGame.gameId = gameId;

        await this._machineGamesRepo.save(
          this._machineGamesRepo.create(machineGame),
        );
      }
    } catch (err) {
      await this._machineRepo.delete({
        id: machine.id,
      });

      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding games for this machine.',
      );
    }
  }
}
