import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameAllComponent } from './pages/all/game-all.component';
import { GameEditComponent } from './pages/edit/game-edit.component';
import { GameAddComponent } from './pages/add/game-add.component';
import { getGamesResolver } from './resolvers/get-games.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: GameAllComponent,
        pathMatch: 'full',
        resolve: {
          locations: getGamesResolver,
        },
      },
      {
        path: 'add',
        component: GameAddComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit/:gameId',
        component: GameEditComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
