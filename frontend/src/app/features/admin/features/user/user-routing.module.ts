import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAllComponent } from './pages/all/user-all.component';
import { UserAddComponent } from './pages/add/user-add.component';
import { UserEditComponent } from './pages/edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: UserAllComponent,
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: UserAddComponent,
        pathMatch: 'full',
      },
      {
        path: ':userId',
        component: UserEditComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
