import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResendVerificationComponent } from './pages/resend-verification/resend-verification.component';
import { ConfirmVerificationComponent } from './pages/confirm-verification/confirm-verification.component';
import { confirmEmailResolver } from './resolvers/confirm-email.resolver';
import { resetPasswordAccessResolver } from './resolvers/reset-password-access.resolver';

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
  {
    path: 'password/forgot',
    component: ForgotPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'password/reset',
    component: ResetPasswordComponent,
    pathMatch: 'full',
    resolve: { isAllowed: resetPasswordAccessResolver },
  },
  {
    path: 'verification/resend',
    pathMatch: 'full',
    component: ResendVerificationComponent,
  },
  {
    path: 'verification/confirm',
    pathMatch: 'full',
    component: ConfirmVerificationComponent,
    resolve: { confirmed: confirmEmailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
