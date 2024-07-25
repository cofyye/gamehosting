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

      if (
        !(await this._utilsService.checkIfSlotIsInRange(body.gameId, plan.slot))
      ) {
        functions.throwHttpException(
          false,
          'The slot is not in range.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (body.customPrice < 0) {
        functions.throwHttpException(
          false,
          'The price must not be less than 0.',
          HttpStatus.BAD_REQUEST,
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
      const tst = functions.generateRandomString(10);
      console.log(tst);
      server.ftpPassword = this._encryptionService.encrypt(tst);
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
}
