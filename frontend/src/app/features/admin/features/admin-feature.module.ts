import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { LocationModule } from './location/location.module';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AdminIndexComponent } from './admin-index.component';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';
import { locationReducer } from '../shared/stores/location/location.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '../shared/stores/location/location.effects';
import { GameEffects } from '../shared/stores/game/game.effects';
import { GameService } from '../shared/services/game.service';
import { LocationService } from '../shared/services/location.service';
import { MachineService } from '../shared/services/machine.service';
import { machineReducer } from '../shared/stores/machine/machine.reducer';
import { gameReducer } from '../shared/stores/game/game.reducer';
import { MachineEffects } from '../shared/stores/machine/machine.effects';
import { planReducer } from '../shared/stores/plan/plan.reducer';
import { PlanEffects } from '../shared/stores/plan/plan.effects';
import { PlanService } from '../shared/services/plan.service';

@NgModule({
  declarations: [
    AdminIndexComponent,
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    LocationModule,
    UserModule,
    StoreModule.forFeature('location', locationReducer),
    StoreModule.forFeature('game', gameReducer),
    StoreModule.forFeature('machine', machineReducer),
    StoreModule.forFeature('plan', planReducer),
    EffectsModule.forFeature([
      LocationEffects,
      GameEffects,
      MachineEffects,
      PlanEffects,
    ]),
  ],
  providers: [GameService, LocationService, MachineService, PlanService],
})
export class AdminFeatureModule {}
