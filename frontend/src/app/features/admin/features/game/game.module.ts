import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GameAddComponent } from './pages/add/game-add.component';
import { GameRoutingModule } from './game-routing.module';
import { GameAllComponent } from './pages/all/game-all.component';
import { GameEditComponent } from './pages/edit/game-edit.component';
import { GameSelectComponent } from '../../shared/components/game-select/game-select.component';

@NgModule({
  declarations: [
    GameAddComponent,
    GameAllComponent,
    GameEditComponent,
    GameSelectComponent,
  ],
  imports: [CommonModule, GameRoutingModule, ReactiveFormsModule],
})
export class GameModule {}
