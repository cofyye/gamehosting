import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './machine-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MachineAddComponent } from './pages/add/machine-add.component';
import { MachineAllComponent } from './pages/all/machine-all.component';
import { MachineEditComponent } from './pages/edit/machine-edit.component';

@NgModule({
  declarations: [
    MachineAddComponent,
    MachineAllComponent,
    MachineEditComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('location', locationReducer),
    // EffectsModule.forFeature(LocationEffects),
  ],
  // providers: [LocationService],
})
export class MachineModule {}
