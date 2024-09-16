import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServersComponent } from './pages/user-servers/user-servers.component';
import { ServerInfoComponent } from './pages/server-info/server-info.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: UserServersComponent,
        pathMatch: 'full',
      },
      {
        path: ':serverId',
        component: ServerInfoComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {}
