import { Module } from '@nestjs/common';

import { LocationModule } from './routes/location/location.module';
import { GameModule } from './routes/game/game.module';

@Module({
  imports: [LocationModule, GameModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
