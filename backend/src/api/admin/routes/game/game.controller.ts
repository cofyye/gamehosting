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

import { AddGameDto } from './dtos/add-game.dto';
import { EditGameDto } from './dtos/edit-game.dto';

import { GameService } from './game.service';

@Controller('admin/game')
@UseGuards(AuthenticatedGuard)
export class GameController {
  constructor(private readonly _gameService: GameService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addGame(
    @Body() body: AddGameDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      await this._gameService.addGame(body, req.files?.icon);

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
  public async getGames(): Promise<IDataSendResponse<GameEntity[]>> {
    try {
      return {
        success: true,
        data: await this._gameService.getGames(),
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
  public async getGame(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<GameEntity>> {
    try {
      return {
        success: true,
        data: await this._gameService.getGame(params.id),
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

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async editGame(
    @Param() params: UuidDto,
    @Body() body: EditGameDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      await this._gameService.editGame(params.id, body, req.files?.icon);

      return {
        success: true,
        message: 'You have successfully updated the game.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while updating the game.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteGame(@Param() params: UuidDto): Promise<ISendResponse> {
    try {
      await this._gameService.deleteGame(params.id);

      return {
        success: true,
        message: 'You have successfully deleted the game.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the game.',
      );
    }
  }
}
