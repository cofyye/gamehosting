import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineAllComponent } from './pages/all/machine-all.component';
import { MachineAddComponent } from './pages/add/machine-add.component';
import { MachineEditComponent } from './pages/edit/machine-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: MachineAllComponent,
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: MachineAddComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit/:machineId',
        component: MachineEditComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
