import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineAllComponent } from './pages/all/machine-all.component';
import { MachineAddComponent } from './pages/add/machine-add.component';
import { MachineEditComponent } from './pages/edit/machine-edit.component';
import { getLocationsGamesResolver } from './resolvers/get-locations-games.resolver';
import { getMachinesResolver } from '../../shared/resolvers/get-machines.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: MachineAllComponent,
        pathMatch: 'full',
        resolve: {
          machines: getMachinesResolver,
        },
      },
      {
        path: 'add',
        component: MachineAddComponent,
        pathMatch: 'full',
        resolve: {
          data: getLocationsGamesResolver,
        },
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
export class MachineRoutingModule {}
