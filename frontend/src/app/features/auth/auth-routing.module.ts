import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'password/forgot',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'password/reset',
  //   pathMatch: 'full',

  //   // resolve: { isAllowed: resetPasswordResolver },
  // },
  // {
  //   path: 'verification/confirm',
  //   pathMatch: 'full',

  //   // resolve: { isAllowed: confirmEmailResolver },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
