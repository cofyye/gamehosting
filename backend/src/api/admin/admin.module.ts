import { Module } from '@nestjs/common';

import { LocationModule } from './routes/location/location.module';
import { GameModule } from './routes/game/game.module';
import { MachineModule } from './routes/machine/machine.module';
import { ModModule } from './routes/mod/mod.module';

@Module({
  imports: [LocationModule, GameModule, MachineModule, ModModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
