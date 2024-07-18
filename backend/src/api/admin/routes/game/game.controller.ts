import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { GameEntity } from 'src/shared/entities/game.entity';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';
import { UuidDto } from 'src/shared/dtos/uuid.dto';

import { CreateGameDto } from './dtos/create-game.dto';

import { GameService } from './game.service';

@Controller('admin/game')
@UseGuards(AuthenticatedGuard)
export class GameController {
  constructor(private readonly _gameService: GameService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createGame(
    @Body() body: CreateGameDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      let icon = req.files?.icon;

      if (!icon) {
        functions.throwHttpException(
          false,
          'The icon field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const game: GameEntity = await this._gameService.createGame(body, icon);

      if (!game) {
        functions.throwHttpException(
          false,
          'An error occurred while adding the game.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        success: true,
        message: 'You have successfully added the game.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the game.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getLocations(): Promise<IDataSendResponse<GameEntity[]>> {
    try {
      const games: GameEntity[] = await this._gameService.getGames();

      return {
        success: true,
        data: games,
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all games.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getLocation(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<GameEntity>> {
    try {
      const game: GameEntity = await this._gameService.getGame(params.id);

      return {
        success: true,
        data: game,
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the game.',
      );
    }
  }
}
