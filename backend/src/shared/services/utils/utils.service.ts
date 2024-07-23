import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { functions } from 'src/shared/utils/functions';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { GameEntity } from 'src/shared/entities/game.entity';
import { MachineGamesEntity } from 'src/shared/entities/machine-games.entity';
import { UserEntity } from 'src/shared/entities/user.entity';
import { ModEntity } from 'src/shared/entities/mod.entity';
import { ServerEntity } from 'src/shared/entities/server.entity';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    @InjectRepository(MachineEntity)
    private readonly _machineRepo: Repository<MachineEntity>,
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
    @InjectRepository(ModEntity)
    private readonly _modRepo: Repository<ModEntity>,
    @InjectRepository(ServerEntity)
    private readonly _serverRepo: Repository<ServerEntity>,
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

  public async userExists(userId: string): Promise<boolean> {
    try {
      const count = await this._userRepo.count({
        where: { id: userId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the user exists.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async modExists(modId: string): Promise<boolean> {
    try {
      const count = await this._modRepo.count({
        where: { id: modId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the mod exists.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async checkIfPortExistsOnProvidedMachine(
    machineId: string,
    port: number,
  ): Promise<boolean> {
    try {
      const count = await this._serverRepo.count({
        where: {
          machineId,
          port,
        },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the port exists on provided machine.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async checkIfPortIsInRange(
    gameId: string,
    port: number,
  ): Promise<boolean> {
    try {
      const game = await this._gameRepo.findOne({
        where: { id: gameId },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          `This game does not exist.`,
          HttpStatus.NOT_FOUND,
        );
      }

      return port >= game.startPort && port <= game.endPort;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while checking if the port is in range.`,
      );
    }
  }

  public async checkIfSlotIsInRange(
    gameId: string,
    slot: number,
  ): Promise<boolean> {
    try {
      const game = await this._gameRepo.findOne({
        where: { id: gameId },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          `This game does not exist.`,
          HttpStatus.NOT_FOUND,
        );
      }

      return slot >= game.slotMin && slot <= game.slotMax;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while checking if the port is in range.`,
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
    } catch (err: unknown) {
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

  public async getAllMachinesFromGameId(
    gameId: string,
  ): Promise<MachineEntity[]> {
    try {
      if (!this.gameExists(gameId)) {
        functions.throwHttpException(
          false,
          `Game with ID ${gameId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const machineGames = await this._machineGamesRepo.find({
        where: {
          gameId,
        },
        relations: {
          machine: true,
        },
      });

      const machines: MachineEntity[] = [];

      machineGames.forEach((item) => {
        machines.push(item.machine);
      });

      return machines;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting machines from game id.',
      );
    }
  }
}
