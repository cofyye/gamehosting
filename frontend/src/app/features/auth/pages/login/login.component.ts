import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { ILoginRequest } from '../../models/auth-request.model';
import { Subscription } from 'rxjs';
import { IS_LOADING } from '../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../shared/stores/loader/loader.actions';
import { LOGIN } from '../../../../shared/stores/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  private loadingLoginSub!: Subscription;
  public isLoadingLogin: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {}

  public loginForm: FormGroup = this._fb.group({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public ngOnInit(): void {
    this.loadingLoginSub = this._store
      .select(IS_LOADING('LOGIN_BTN'))
      .subscribe((value) => (this.isLoadingLogin = value));
  }

  public ngOnDestroy(): void {
    if (this.loadingLoginSub) {
      this.loadingLoginSub.unsubscribe();
    }
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data: ILoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'LOGIN_BTN' }));
    this._store.dispatch(LOGIN({ payload: data }));
  }
}
