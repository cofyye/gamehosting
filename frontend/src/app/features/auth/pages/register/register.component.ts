import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppState } from '../../../../app.state';
import { IRegisterRequest } from '../../models/auth-request.model';
import { usernameAvailabilityValidator } from '../../../../shared/validators/username-availability.validator';
import { emailAvailabilityValidator } from '../../../../shared/validators/email-availability.validator';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IS_LOADING } from '../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../shared/stores/loader/loader.actions';
import { REGISTER } from '../../../../shared/stores/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit, OnDestroy {
  private loadingRegisterSub!: Subscription;
  public isLoadingRegister: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _httpClient: HttpClient,
    private readonly _store: Store<AppState>
  ) {}

  public registerForm: FormGroup = this._fb.group({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z ]+'),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z ]+'),
    ]),
    username: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9._]+([._]?[a-z0-9]+)*$'),
      ],
      asyncValidators: [usernameAvailabilityValidator(this._httpClient)],
    }),
    email: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
      ],
      asyncValidators: [emailAvailabilityValidator(this._httpClient)],
    }),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
    pinCode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      Validators.pattern('^[0-9]+'),
    ]),
  });

  public ngOnInit(): void {
    this.loadingRegisterSub = this._store
      .select(IS_LOADING('REGISTER_BTN'))
      .subscribe((value) => (this.isLoadingRegister = value));
  }

  public ngOnDestroy(): void {
    if (this.loadingRegisterSub) {
      this.loadingRegisterSub.unsubscribe();
    }
  }

  public onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data: IRegisterRequest = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      pinCode: this.registerForm.get('pinCode')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'REGISTER_BTN' }));
    this._store.dispatch(REGISTER({ payload: data }));
  }
}
