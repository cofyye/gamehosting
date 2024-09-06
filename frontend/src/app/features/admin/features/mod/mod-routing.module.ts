import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModAddComponent } from './pages/add/mod-add.component';
import { ModAllComponent } from './pages/all/mod-all.component';
import { getGamesResolver } from '../../shared/resolvers/get-games.resolver';
import { getModsResolver } from '../../shared/resolvers/get-mods.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: ModAllComponent,
        pathMatch: 'full',
        resolve: {
          mods: getModsResolver,
        },
      },
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
