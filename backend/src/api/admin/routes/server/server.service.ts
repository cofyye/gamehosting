import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';

import { ServerEntity } from 'src/shared/entities/server.entity';
import { functions } from 'src/shared/utils/functions';
import { Ssh2Service } from 'src/shared/services/ssh2/ssh2.service';
import { EncryptionService } from 'src/shared/services/encryption/encryption.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { ServerStatus } from 'src/shared/enums/server.enum';

import { AddServerDto } from './dtos/add-server.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly _serverRepo: Repository<ServerEntity>,
    private readonly _encryptionService: EncryptionService,
    private readonly _ssh2Service: Ssh2Service,
    private readonly _utilsService: UtilsService,
  ) {}

  public async addServer(body: AddServerDto): Promise<void> {
    try {
      if (!(await this._utilsService.userExists(body.userId))) {
        functions.throwHttpException(
          false,
          'This user does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      const mod = await this._utilsService.getModById(body.modId);
      const machine = await this._utilsService.getMachineById(body.machineId);
      const game = await this._utilsService.getGameById(body.gameId);
      const plan = await this._utilsService.getPlanById(body.planId);

      if (mod.gameId !== game.id) {
        functions.throwHttpException(
          false,
          'This mod does not belong to the specified game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (plan.gameId !== game.id) {
        functions.throwHttpException(
          false,
          'This plan does not belong to the specified game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        !(await this._utilsService.checkIfServerCanBeHostedOnThisPlanMachine(
          body.planId,
          body.machineId,
        ))
      ) {
        functions.throwHttpException(
          false,
          'The limit for creating servers for this plan and machine has been reached.',
          HttpStatus.FORBIDDEN,
        );
      }

      await this._utilsService.checkIfGameAllowedOnMachine(
        body.gameId,
        body.machineId,
      );

      if (
        !(await this._utilsService.checkIfPortIsInRange(body.gameId, body.port))
      ) {
        functions.throwHttpException(
          false,
          'The port is not in range.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        await this._utilsService.checkIfPortExistsOnProvidedMachine(
          body.machineId,
          body.port,
        )
      ) {
        functions.throwHttpException(
          false,
          'This port is occupied, please choose another one.',
          HttpStatus.CONFLICT,
        );
      }

      const momentDate = moment(body.expirationDate)
        .tz('Europe/Belgrade')
        .toDate();

      if (moment().tz('Europe/Belgrade').isAfter(momentDate)) {
        functions.throwHttpException(
          false,
          'The server expiration date must be after the current date.',
          HttpStatus.BAD_REQUEST,
        );
      }

      let server = new ServerEntity();
      server.name = body.name;
      server.customPrice = body.customPrice;
      server.expirationDate = momentDate;
      server.port = body.port;
      server.startupVariables = (
        await this._utilsService.getModById(body.modId)
      ).startupVariables;
      server.ftpUsername = `srv_${body.userId.split('-')[0]}_${functions.generateRandomString(4)}`;
      server.ftpPassword = this._encryptionService.encrypt(
        functions.generateRandomString(10),
      );
      server.userId = body.userId;
      server.gameId = body.gameId;
      server.modId = body.modId;
      server.machineId = body.machineId;
      server.planId = body.planId;
      server.status = ServerStatus.INSTALLATION_IN_PROGRESS;

      server = await this._serverRepo.save(this._serverRepo.create(server));

      await this._ssh2Service.createGameServer(
        server,
        machine,
        mod,
        game,
        plan,
      );
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the server.',
      );
    }
  }

  public async getServers(): Promise<ServerEntity[]> {
    try {
      return await this._serverRepo.find({
        relations: {
          user: true,
          mod: true,
          plan: true,
          game: true,
          machine: true,
        },
        select: {
          user: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
          mod: {
            modName: true,
          },
          plan: {
            name: true,
            price: true,
          },
          game: {
            name: true,
            tag: true,
          },
          machine: {
            ip: true,
          },
        },
      });
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all servers.',
      );
    }
  }

  public async getServer(id: string): Promise<ServerEntity> {
    try {
      return await this._utilsService.getServerById(id);
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the server.',
      );
    }
  }

  public async deleteServer(id: string): Promise<void> {
    try {
      const server = await this._utilsService.getServerById(id);
      const machine = await this._utilsService.getMachineById(server.machineId);

      await this._ssh2Service.deleteGameServer(server, machine);

      if (!(await this._utilsService.deleteServerById(server.id))) {
        functions.throwHttpException(
          false,
          `The server was deleted, but an error occurred while deleting the server in the database.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the server.',
      );
    }
  }
}
