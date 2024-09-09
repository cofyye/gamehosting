import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerAllComponent } from './pages/all/server-all.component';
import { ServerAddComponent } from './pages/add/server-add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: ServerAllComponent,
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: ServerAddComponent,
        pathMatch: 'full',
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
