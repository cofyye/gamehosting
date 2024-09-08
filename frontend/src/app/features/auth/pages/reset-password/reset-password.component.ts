import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasswordValidators } from '../../../../shared/validators/password.validator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { IS_LOADING } from '../../../../shared/stores/loader/loader.selectors';
import { SELECT_HTTP_RESPONSE } from '../../../../shared/stores/http/http.selectors';
import { START_LOADING } from '../../../../shared/stores/loader/loader.actions';
import { RESET_PASSWORD } from '../../../../shared/stores/auth/auth.actions';
import { IResetPasswordRequest } from '../../../../shared/models/auth/auth-request.model';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private loadingResetPasswordSub!: Subscription;
  public isLoadingResetPassword: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public resetPasswordForm: FormGroup = this._fb.group({
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
      PasswordValidators.containsSpecialChar(),
      PasswordValidators.containsNumber(),
      PasswordValidators.containsUppercase(),
      PasswordValidators.containsLowercase(),
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
      PasswordValidators.containsSpecialChar(),
      PasswordValidators.containsNumber(),
      PasswordValidators.containsUppercase(),
      PasswordValidators.containsLowercase(),
    ]),
  });

  public ngOnInit(): void {
    this.loadingResetPasswordSub = this._store
      .select(IS_LOADING('RESET_PASSWORD_BTN'))
      .subscribe((value) => (this.isLoadingResetPassword = value));
  }

  public ngOnDestroy(): void {
    if (this.loadingResetPasswordSub) {
      this.loadingResetPasswordSub.unsubscribe();
    }
  }

  public onResetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const data: IResetPasswordRequest = {
      password: this.resetPasswordForm.get('password')?.value,
      confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value,
      email: this._activatedRoute.snapshot.queryParamMap.get('email') ?? '',
      token: this._activatedRoute.snapshot.queryParamMap.get('token') ?? '',
    };

    // Check Password Matches
    if (data.password !== data.confirmPassword) {
      this._toaster.error('Passwords do not match.', 'Error');
      return;
    }

    this._store.dispatch(START_LOADING({ key: 'RESET_PASSWORD_BTN' }));
    this._store.dispatch(
      RESET_PASSWORD({
        payload: data,
      })
    );
  }
}
