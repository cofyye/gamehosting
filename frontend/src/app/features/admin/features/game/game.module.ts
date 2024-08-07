import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { locationReducer } from '../../../../shared/stores/location/location.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '../../../../shared/stores/location/location.effects';
import { LocationService } from '../../../../shared/services/location.service';
import { GameAddComponent } from './pages/add/game-add.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [GameAddComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('game', locationReducer),
    // EffectsModule.forFeature(LocationEffects),
  ],
  // providers: [GameService],
})
export class GameModule {}
