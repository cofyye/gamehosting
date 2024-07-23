import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { GameEntity } from 'src/shared/entities/game.entity';
import { ModEntity } from 'src/shared/entities/mod.entity';
import { ServerEntity } from 'src/shared/entities/server.entity';
import { MachineGamesEntity } from 'src/shared/entities/machine-games.entity';

import { UtilsService } from './utils.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      LocationEntity,
      MachineEntity,
      MachineGamesEntity,
      GameEntity,
      ModEntity,
      ServerEntity,
    ]),
  ],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
