import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

import { ModEntity } from 'src/shared/entities/mod.entity';
import { functions } from 'src/shared/utils/functions';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { FileUploadService } from 'src/shared/services/file-upload/file-upload.service';
import { Ssh2Service } from 'src/shared/services/ssh2/ssh2.service';

import { AddModDto } from './dtos/add-mod.dto';

@Injectable()
export class ModService {
  constructor(
    @InjectRepository(ModEntity)
    private readonly _modRepo: Repository<ModEntity>,
    private readonly _utilsService: UtilsService,
    private readonly _fileUploadService: FileUploadService,
    private readonly _ssh2Service: Ssh2Service,
  ) {}

  public async addMod(
    body: AddModDto,
    dockerFile: UploadedFile | UploadedFile[],
  ): Promise<void> {
    try {
      if (!dockerFile) {
        functions.throwHttpException(
          false,
          'The docker file field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      functions.validateProvidedStartupVariables(body.startupVariables);

      if (!(await this._utilsService.gameExists(body.gameId))) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      let mod = await this._modRepo.findOne({
        where: [
          {
            modName: body.modName,
          },
          { dockerName: body.dockerName },
        ],
      });

      if (mod?.modName === body.modName) {
        functions.throwHttpException(
          false,
          'A mod with this name already exists.',
          HttpStatus.CONFLICT,
        );
      }

      if (mod?.dockerName === body.dockerName) {
        functions.throwHttpException(
          false,
          'A mod with this docker name already exists.',
          HttpStatus.CONFLICT,
        );
      }

      mod = new ModEntity();
      mod.modName = body.modName;
      mod.dockerName = body.dockerName;
      mod.startupVariables = body.startupVariables;
      mod.startupCommand = body.startupCommand;
      mod.description = body.description;
      mod.gameId = body.gameId;

      try {
        await this._fileUploadService.uploadDocker(mod.dockerName, dockerFile);
        await this._ssh2Service.uploadAndBuildDocker(
          body.gameId,
          body.dockerName,
        );
        await this._modRepo.save(this._modRepo.create(mod));
      } catch (err: unknown) {
        await this._ssh2Service.removeIfuploadAndBuildDockerFailed(
          body.gameId,
          body.dockerName,
        );
        this._fileUploadService.deleteDocker(body.dockerName);

        functions.handleHttpException(
          err,
          false,
          'An error occurred while adding the mod.',
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the mod.',
      );
    }
  }
}
