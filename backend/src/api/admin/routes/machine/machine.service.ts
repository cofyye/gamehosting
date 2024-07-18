import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MachineEntity } from 'src/shared/entities/machine.entity';
import { functions } from 'src/shared/utils/functions';

import { AddMachineDto } from './dtos/add-machine.dto';
import { EncryptionService } from 'src/shared/services/encryption/encryption.service';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(MachineEntity)
    private readonly _machineRepo: Repository<MachineEntity>,
    private readonly _encryptionService: EncryptionService,
  ) {}

  public async addMachine(body: AddMachineDto): Promise<MachineEntity> {
    try {
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

      machine = new MachineEntity();
      machine.name = body.name;
      machine.username = body.username;
      machine.ip = body.ip;
      machine.sshPort = body.sshPort;
      machine.ftpPort = body.ftpPort;
      machine.maxServers = body.maxServers;
      machine.password = this._encryptionService.encrypt(body.password);

      return await this._machineRepo.save(this._machineRepo.create(machine));
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the machine.',
      );
    }
  }
}
