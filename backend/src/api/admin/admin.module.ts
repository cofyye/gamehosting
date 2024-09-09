import { Module } from '@nestjs/common';

import { LocationModule } from './routes/location/location.module';
import { GameModule } from './routes/game/game.module';
import { MachineModule } from './routes/machine/machine.module';
import { ModModule } from './routes/mod/mod.module';
import { ServerModule } from './routes/server/server.module';
import { PlanModule } from './routes/plan/plan.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    LocationModule,
    GameModule,
    MachineModule,
    ModModule,
    ServerModule,
    PlanModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
