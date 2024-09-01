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
      const games = functions.validateProvidedGamesForMachine(body.games);

      if (!(await this._utilsService.locationExists(body.locationId))) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.NOT_FOUND,
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

      await this._ssh2Service.autoInstallationWizard({
        host: body.ip,
        port: body.sshPort,
        username: body.username,
        password: body.password,
        readyTimeout: 3000,
      });

      machine = new MachineEntity();
      machine.name = body.name;
      machine.username = body.username;
      machine.ip = body.ip;
      machine.sshPort = body.sshPort;
      machine.ftpPort = body.ftpPort;
      machine.password = this._encryptionService.encrypt(body.password);
      machine.locationId = body.locationId;

      machine = await this._machineRepo.save(this._machineRepo.create(machine));

      await this._utilsService.addGamesForMachines(machine, games);
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the machine.',
      );
    }
  }

  public async getMachines(): Promise<MachineEntity[]> {
    try {
      return await this._machineRepo.find({
        select: {
          id: true,
          name: true,
          ip: true,
          ftpPort: true,
          sshPort: true,
          locationId: true,
          username: true,
          createdAt: true,
        },
      });
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all machines.',
      );
    }
  }

  public async getMachine(id: string): Promise<MachineEntity> {
    try {
      return await this._utilsService.getMachineById(id);
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the machine.',
      );
    }
  }
}
