import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GameAddComponent } from './pages/add/game-add.component';
import { GameRoutingModule } from './game-routing.module';
import { GameService } from './services/game.service';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './store/game.reducer';
import { GameEffects } from './store/game.effects';
import { EffectsModule } from '@ngrx/effects';
import { GameAllComponent } from './pages/all/game-all.component';
import { GameEditComponent } from './pages/edit/game-edit.component';

@NgModule({
  declarations: [GameAddComponent, GameAllComponent, GameEditComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('game', gameReducer),
    EffectsModule.forFeature(GameEffects),
  ],
  providers: [GameService],
})
export class GameModule {}
