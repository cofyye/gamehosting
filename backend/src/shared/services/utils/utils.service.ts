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
import { PlanEntity } from 'src/shared/entities/plan.entity';
import { PlanMachinesEntity } from 'src/shared/entities/plan-machines.entity';
import { IProvidedMachinesForPlan } from 'src/shared/interfaces/plan.interface';

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
    @InjectRepository(PlanEntity)
    private readonly _planRepo: Repository<PlanEntity>,
    @InjectRepository(MachineGamesEntity)
    private readonly _machineGamesRepo: Repository<MachineGamesEntity>,
    @InjectRepository(PlanMachinesEntity)
    private readonly _planMachinesRepo: Repository<PlanMachinesEntity>,
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

  public async planExists(planId: string): Promise<boolean> {
    try {
      const count = await this._planRepo.count({
        where: { id: planId },
      });
      return count > 0;
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while checking if the plan exists.`,
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

  public async checkIfGameAllowedOnMachine(
    gameId: string,
    machineId: string,
  ): Promise<void> {
    try {
      const machineGame = await this._machineGamesRepo.findOne({
        where: { gameId, machineId },
      });

      if (!machineGame) {
        functions.throwHttpException(
          false,
          `This machine does not support this game.`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while checking if the game allowed on this machine.`,
      );
    }
  }

  public async checkIfServerCanBeHostedOnThisPlanMachine(
    planId: string,
    machineId: string,
  ): Promise<boolean> {
    try {
      const planMachine = await this._planMachinesRepo.findOne({
        where: { planId, machineId },
      });

      if (!planMachine) {
        functions.throwHttpException(
          false,
          `The plan is still not set for this machine.`,
          HttpStatus.PRECONDITION_FAILED,
        );
      }

      const getAllServerOnThisMachinePlanCount = await this._serverRepo.count({
        where: {
          machineId,
          planId,
        },
      });

      return planMachine.serverCount >= getAllServerOnThisMachinePlanCount + 1;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while checking if the server can be hosted on this plan and machine.`,
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
        `An error occurred while checking if the slot is in range.`,
      );
    }
  }

  public async checkIfPortIsInRange(
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

      return slot >= game.startPort && slot <= game.endPort;
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

  public async addMachinesForPlan(
    plan: PlanEntity,
    machines: IProvidedMachinesForPlan[],
  ): Promise<void> {
    try {
      for (const machineItem of machines) {
        const machine = await this._machineRepo.findOne({
          where: {
            id: machineItem.id,
          },
        });

        if (!machine) {
          functions.throwHttpException(
            false,
            `Machine with ID ${machineItem.id} not found.`,
            HttpStatus.NOT_FOUND,
          );
        }

        const machineExistInPlanMachineDb =
          await this._planMachinesRepo.findOne({
            where: {
              planId: plan.id,
              machineId: machineItem.id,
            },
          });

        if (machineExistInPlanMachineDb) {
          functions.throwHttpException(
            false,
            `Machine ${machine.name} has already been added to this plan.`,
            HttpStatus.CONFLICT,
          );
        }

        const planMachine = new PlanMachinesEntity();
        planMachine.planId = plan.id;
        planMachine.machineId = machineItem.id;
        planMachine.serverCount = machineItem.server_count;

        await this._planMachinesRepo.save(
          this._planMachinesRepo.create(planMachine),
        );
      }
    } catch (err: unknown) {
      await this._planRepo.delete({
        id: plan.id,
      });

      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding machines for this plan.',
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

  public async getMachineById(machineId: string): Promise<MachineEntity> {
    try {
      const machine = await this._machineRepo.findOne({
        where: { id: machineId },
      });

      if (!machine) {
        functions.throwHttpException(
          false,
          'This machine does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return machine;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting machine.',
      );
    }
  }

  public async getModById(modId: string): Promise<ModEntity> {
    try {
      const mod = await this._modRepo.findOne({
        where: { id: modId },
      });

      if (!mod) {
        functions.throwHttpException(
          false,
          'This mod does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return mod;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting mod.',
      );
    }
  }

  public async getGameById(gameId: string): Promise<GameEntity> {
    try {
      const game = await this._gameRepo.findOne({
        where: { id: gameId },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return game;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting game.',
      );
    }
  }

  public async getPlanById(planId: string): Promise<PlanEntity> {
    try {
      const plan = await this._planRepo.findOne({
        where: { id: planId },
      });

      if (!plan) {
        functions.throwHttpException(
          false,
          'This plan does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return plan;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting plan.',
      );
    }
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    try {
      const user = await this._userRepo.findOne({
        where: { id: userId },
      });

      if (!user) {
        functions.throwHttpException(
          false,
          'This user does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while getting user.',
      );
    }
  }

  public async deleteServerById(serverId: string): Promise<boolean> {
    try {
      if (!(await this._serverRepo.delete({ id: serverId })).affected) {
        return false;
      } else {
        return true;
      }
    } catch (err: unknown) {
      return false;
    }
  }
}
