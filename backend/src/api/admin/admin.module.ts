import { Module } from '@nestjs/common';

import { LocationModule } from './routes/location/location.module';
import { GameModule } from './routes/game/game.module';
import { MachineModule } from './routes/machine/machine.module';
import { ModModule } from './routes/mod/mod.module';
import { ServerModule } from './routes/server/server.module';

@Module({
  imports: [LocationModule, GameModule, MachineModule, ModModule, ServerModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
