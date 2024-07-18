import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { GameEntity } from 'src/shared/entities/game.entity';
import { FileUploadModule } from 'src/shared/services/file-upload/file-upload.module';

import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, GameEntity]),
    FileUploadModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
