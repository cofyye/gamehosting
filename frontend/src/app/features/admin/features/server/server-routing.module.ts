import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerAllComponent } from './pages/all/server-all.component';
import { ServerAddComponent } from './pages/add/server-add.component';
import { getUsersResolver } from '../../shared/resolvers/get-users.resolver';
import { getMachinesResolver } from '../../shared/resolvers/get-machines.resolver';
import { getServersResolver } from '../../shared/resolvers/get-servers.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: ServerAllComponent,
        pathMatch: 'full',
        resolve: {
          servers: getServersResolver,
        },
      },
      {
        path: 'add',
        component: ServerAddComponent,
        pathMatch: 'full',
        resolve: {
          users: getUsersResolver,
          machines: getMachinesResolver,
        },
      },
      // {
      //   path: 'edit/:planId',
      //   component: PlanEditComponent,
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {}
