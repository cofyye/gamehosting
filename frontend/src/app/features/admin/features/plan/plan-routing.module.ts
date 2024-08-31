import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanAllComponent } from './pages/all/plan-all.component';
import { PlanAddComponent } from './pages/add/plan-add.component';
import { PlanEditComponent } from './pages/edit/plan-edit.component';
import { getGamesMachinesResolver } from './resolvers/get-games-machines.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: PlanAllComponent,
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: PlanAddComponent,
        pathMatch: 'full',
        resolve: {
          data: getGamesMachinesResolver,
        },
      },
      {
        path: 'edit/:planId',
        component: PlanEditComponent,
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
