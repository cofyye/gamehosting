import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

import { GameEntity } from 'src/shared/entities/game.entity';
import { FileUploadService } from 'src/shared/services/file-upload/file-upload.service';
import { functions } from 'src/shared/utils/functions';

import { AddGameDto } from './dtos/add-game.dto';
import { EditGameDto } from './dtos/edit-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
    private readonly _fileUploadService: FileUploadService,
  ) {}

  public async addGame(
    body: AddGameDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<GameEntity> {
    let filename = '';

    try {
      let game = await this._gameRepo.findOne({
        where: [
          {
            name: body.name,
          },
          { gamedigTag: body.gamedigTag },
        ],
      });

      if (game?.name === body.name) {
        functions.throwHttpException(
          false,
          'A game with this name already exists.',
          HttpStatus.CONFLICT,
        );
      }

      if (game?.gamedigTag === body.gamedigTag) {
        functions.throwHttpException(
          false,
          'A game with this gamedig tag already exists.',
          HttpStatus.CONFLICT,
        );
      }

      game = new GameEntity();
      game.name = body.name;
      game.gamedigTag = body.gamedigTag;
      game.pricePerSlot = body.pricePerSlot;
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

      return await this._gameRepo.save(this._gameRepo.create(game));
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
      const game = await this._gameRepo.findOne({
        where: {
          id,
        },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      game.name = body.name;
      game.gamedigTag = body.gamedigTag;
      game.pricePerSlot = body.pricePerSlot;
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
      const game = await this._gameRepo.findOne({
        where: {
          id,
        },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return game;
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
      const game = await this._gameRepo.findOne({
        where: {
          id,
        },
      });

      if (!game) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
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
