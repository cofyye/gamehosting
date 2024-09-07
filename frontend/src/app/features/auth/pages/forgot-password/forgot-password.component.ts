import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { Subscription } from 'rxjs';
import { IS_LOADING } from '../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../shared/stores/loader/loader.actions';
import { FORGOT_PW } from '../../../../shared/stores/auth/auth.actions';
import { EMAIL_REGEX } from '../../../../shared/utils/regex.constants';
import { SELECT_HTTP_RESPONSE } from '../../../../shared/stores/http/http.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private loadingForgotPwSub!: Subscription;
  private forgotPwSub!: Subscription;
  public isLoadingForgotPw: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {}

  public forgotPasswordForm: FormGroup = this._fb.group({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(EMAIL_REGEX),
    ]),
  });

  public ngOnInit(): void {
    this.loadingForgotPwSub = this._store
      .select(IS_LOADING('FORGOT_PW_BTN'))
      .subscribe((value) => (this.isLoadingForgotPw = value));

    this.forgotPwSub = this._store
      .select(SELECT_HTTP_RESPONSE('FORGOT_PW'))
      .subscribe((response) => {
        if (response?.success) {
          this.forgotPasswordForm.reset();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingForgotPwSub) {
      this.loadingForgotPwSub.unsubscribe();
    }
    if (this.forgotPwSub) {
      this.forgotPwSub.unsubscribe();
    }
  }

  public onForgotPw(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this._store.dispatch(START_LOADING({ key: 'FORGOT_PW_BTN' }));
    this._store.dispatch(
      FORGOT_PW({ payload: this.forgotPasswordForm.get('email')?.value })
    );
  }
}
