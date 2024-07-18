import { Module } from '@nestjs/common';

import { LocationModule } from './routes/location/location.module';
import { GameModule } from './routes/game/game.module';
import { MachineModule } from './routes/machine/machine.module';

@Module({
  imports: [LocationModule, GameModule, MachineModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
