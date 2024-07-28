import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

import { GameEntity } from 'src/shared/entities/game.entity';
import { FileUploadService } from 'src/shared/services/file-upload/file-upload.service';
import { functions } from 'src/shared/utils/functions';
import { UtilsService } from 'src/shared/services/utils/utils.service';

import { AddGameDto } from './dtos/add-game.dto';
import { EditGameDto } from './dtos/edit-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
    private readonly _fileUploadService: FileUploadService,
    private readonly _utilsService: UtilsService,
  ) {}

  public async addGame(
    body: AddGameDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<void> {
    let filename = '';

    try {
      if (!icon) {
        functions.throwHttpException(
          false,
          'The icon field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!functions.checkListOfSupportedGames(body.tag)) {
        functions.throwHttpException(
          false,
          'Supported tags for games currently are: counterstrike16 & counterstrike2.',
          HttpStatus.BAD_REQUEST,
        );
      }

      let game = await this._gameRepo.findOne({
        where: [
          {
            name: body.name,
          },
          { tag: body.tag },
        ],
      });

      if (game?.name === body.name) {
        functions.throwHttpException(
          false,
          'A game with this name already exists.',
          HttpStatus.CONFLICT,
        );
      }

      if (game?.tag === body.tag) {
        functions.throwHttpException(
          false,
          'A game with this gamedig tag already exists.',
          HttpStatus.CONFLICT,
        );
      }

      game = new GameEntity();
      game.name = body.name;
      game.tag = body.tag;
      game.startPort = body.startPort;
      game.endPort = body.endPort;
      game.slotMin = body.slotMin;
      game.slotMax = body.slotMax;
      game.description = body.description;

      filename = await this._fileUploadService.uploadImage('game', icon);

      if (!filename) {
        functions.throwHttpException(
          false,
          'An error occurred while uploading the icon.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      game.icon = filename;

      await this._gameRepo.save(this._gameRepo.create(game));
    } catch (err) {
      this._fileUploadService.deleteFile(filename);

      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the game.',
      );
    }
  }

  public async editGame(
    id: string,
    body: EditGameDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<void> {
    let filename: string = '';

    try {
      const game = await this._utilsService.getGameById(id);

      game.name = body.name;
      game.tag = body.tag;
      game.startPort = body.startPort;
      game.endPort = body.endPort;
      game.slotMin = body.slotMin;
      game.slotMax = body.slotMax;
      game.description = body.description;

      if (icon) {
        filename = await this._fileUploadService.uploadImage('game', icon);

        if (!filename) {
          functions.throwHttpException(
            false,
            'An error occurred while uploading the icon.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        this._fileUploadService.deleteFile(game.icon);

        game.icon = filename;
      }

      await this._gameRepo.save(game);
    } catch (err) {
      this._fileUploadService.deleteFile(filename);

      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the games.',
      );
    }
  }

  public async getGames(): Promise<GameEntity[]> {
    try {
      return await this._gameRepo.find();
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all games.',
      );
    }
  }

  public async getGame(id: string): Promise<GameEntity> {
    try {
      return await this._utilsService.getGameById(id);
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the game.',
      );
    }
  }

  public async deleteGame(id: string): Promise<void> {
    try {
      const game = await this._utilsService.getGameById(id);

      if (await this._utilsService.gameHasMachines(id)) {
        functions.throwHttpException(
          false,
          'Before deleting the game, you must delete all machines associated with this game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (await this._utilsService.gameHasServers(id)) {
        functions.throwHttpException(
          false,
          'Before deleting the game, you must delete all servers associated with this game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (await this._utilsService.gameHasPlans(id)) {
        functions.throwHttpException(
          false,
          'Before deleting the game, you must delete all plans associated with this game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (await this._utilsService.gameHasMods(id)) {
        functions.throwHttpException(
          false,
          'Before deleting the game, you must delete all mods associated with this game.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!(await this._gameRepo.delete({ id })).affected) {
        functions.throwHttpException(
          false,
          'An error occurred while deleting the game.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this._fileUploadService.deleteFile(game.icon);
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the game.',
      );
    }
  }
}
