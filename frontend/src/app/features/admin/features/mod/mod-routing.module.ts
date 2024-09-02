import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModAddComponent } from './pages/add/mod-add.component';
import { getGamesResolver } from '../../shared/resolvers/get-games.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      // {
      //   path: '',
      //   component: PlanAllComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'add',
        component: ModAddComponent,
        pathMatch: 'full',
        resolve: {
          games: getGamesResolver,
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
export class LocationRoutingModule {}
