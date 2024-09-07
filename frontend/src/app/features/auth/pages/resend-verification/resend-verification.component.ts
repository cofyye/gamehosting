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
import {
  FORGOT_PW,
  RESEND_VERIFICATION,
} from '../../../../shared/stores/auth/auth.actions';
import { EMAIL_REGEX } from '../../../../shared/utils/regex.constants';
import { SELECT_HTTP_RESPONSE } from '../../../../shared/stores/http/http.selectors';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrl: './resend-verification.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ResendVerificationComponent implements OnInit, OnDestroy {
  private loadingResendVerificationSub!: Subscription;
  private resendVerificationSub!: Subscription;
  public isLoadingResendVerification: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {}

  public resendVerificationForm: FormGroup = this._fb.group({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(EMAIL_REGEX),
    ]),
  });

  public ngOnInit(): void {
    this.loadingResendVerificationSub = this._store
      .select(IS_LOADING('RESEND_VERIFICATION_BTN'))
      .subscribe((value) => (this.isLoadingResendVerification = value));

    this.resendVerificationSub = this._store
      .select(SELECT_HTTP_RESPONSE('RESEND_VERIFICATION'))
      .subscribe((response) => {
        if (response?.success) {
          this.resendVerificationForm.reset();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingResendVerificationSub) {
      this.loadingResendVerificationSub.unsubscribe();
    }
    if (this.resendVerificationSub) {
      this.resendVerificationSub.unsubscribe();
    }
  }

  public onResendVerification(): void {
    if (this.resendVerificationForm.invalid) {
      this.resendVerificationForm.markAllAsTouched();
      return;
    }

    this._store.dispatch(START_LOADING({ key: 'RESEND_VERIFICATION_BTN' }));
    this._store.dispatch(
      RESEND_VERIFICATION({
        payload: this.resendVerificationForm.get('email')?.value,
      })
    );
  }
}
