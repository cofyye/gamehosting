import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
