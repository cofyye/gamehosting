import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRoutingModule } from './machine-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MachineAddComponent } from './pages/add/machine-add.component';
import { MachineAllComponent } from './pages/all/machine-all.component';
import { MachineEditComponent } from './pages/edit/machine-edit.component';

@NgModule({
  declarations: [
    MachineAddComponent,
    MachineAllComponent,
    MachineEditComponent,
  ],
  imports: [CommonModule, MachineRoutingModule, ReactiveFormsModule],
})
export class MachineModule {}
