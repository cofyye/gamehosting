import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServersComponent } from './pages/user-servers/user-servers.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {}
