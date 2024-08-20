import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './plan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PlanAddComponent } from './pages/add/plan-add.component';
import { PlanAllComponent } from './pages/all/plan-all.component';
import { PlanEditComponent } from './pages/edit/plan-edit.component';

@NgModule({
  declarations: [PlanAddComponent, PlanAllComponent, PlanEditComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('location', locationReducer),
    // EffectsModule.forFeature(LocationEffects),
  ],
  // providers: [LocationService],
})
export class PlanModule {}
