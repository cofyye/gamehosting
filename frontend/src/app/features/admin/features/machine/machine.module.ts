import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRoutingModule } from './machine-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MachineAddComponent } from './pages/add/machine-add.component';
import { MachineAllComponent } from './pages/all/machine-all.component';
import { MachineEditComponent } from './pages/edit/machine-edit.component';
import { MachineService } from './services/machine.service';
import { MachineEffects } from './store/machine.effects';
import { machineReducer } from './store/machine.reducer';

@NgModule({
  declarations: [
    MachineAddComponent,
    MachineAllComponent,
    MachineEditComponent,
  ],
  imports: [
    CommonModule,
    MachineRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('machine', machineReducer),
    EffectsModule.forFeature(MachineEffects),
  ],
  providers: [MachineService],
})
export class MachineModule {}
