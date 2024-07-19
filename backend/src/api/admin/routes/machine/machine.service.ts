import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MachineEntity } from 'src/shared/entities/machine.entity';
import { functions } from 'src/shared/utils/functions';
import { Ssh2Service } from 'src/shared/services/ssh2/ssh2.service';
import { EncryptionService } from 'src/shared/services/encryption/encryption.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';

import { AddMachineDto } from './dtos/add-machine.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(MachineEntity)
    private readonly _machineRepo: Repository<MachineEntity>,
    private readonly _encryptionService: EncryptionService,
    private readonly _ssh2Service: Ssh2Service,
    private readonly _utilsService: UtilsService,
  ) {}

  public async addMachine(body: AddMachineDto): Promise<void> {
    try {
      if (!(await this._utilsService.locationExists(body.locationId))) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.CONFLICT,
        );
      }

      let machine = await this._machineRepo.findOne({
        where: [
          {
            name: body.name,
          },
          { ip: body.ip },
        ],
      });

      if (machine?.name === body.name) {
        functions.throwHttpException(
          false,
          'A machine with this name already exists.',
          HttpStatus.CONFLICT,
        );
      }

      if (machine?.ip === body.ip) {
        functions.throwHttpException(
          false,
          'A machine with this ip address already exists.',
          HttpStatus.CONFLICT,
        );
      }

      await this._ssh2Service.checkConnection({
        host: body.ip,
        port: body.sshPort,
        username: body.username,
        password: body.password,
        readyTimeout: 3000,
        retry_minTimeout: 1000,
      });

      machine = new MachineEntity();
      machine.name = body.name;
      machine.username = body.username;
      machine.ip = body.ip;
      machine.sshPort = body.sshPort;
      machine.ftpPort = body.ftpPort;
      machine.maxServers = body.maxServers;
      machine.password = this._encryptionService.encrypt(body.password);
      machine.locationId = body.locationId;

      await this._machineRepo.save(this._machineRepo.create(machine));
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the machine.',
      );
    }
  }
}
