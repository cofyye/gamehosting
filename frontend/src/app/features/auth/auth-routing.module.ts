import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    pathMatch: 'full',
  },
  {
    path: 'password/forgot',
    pathMatch: 'full',
  },
  {
    path: 'password/reset',
    pathMatch: 'full',

    // resolve: { isAllowed: resetPasswordResolver },
  },
  {
    path: 'verification/confirm',
    pathMatch: 'full',

    // resolve: { isAllowed: confirmEmailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
