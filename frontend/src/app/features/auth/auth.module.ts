import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthService } from '../../shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../shared/stores/auth/auth.effects';
import { CountrySelectModule } from '../../shared/components/country-select/country-select.module';
import { ResendVerificationComponent } from './pages/resend-verification/resend-verification.component';
import { ConfirmVerificationComponent } from './pages/confirm-verification/confirm-verification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResendVerificationComponent,
    ConfirmVerificationComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(AuthEffects),
    CountrySelectModule,
  ],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
