import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppState } from '../../../../app.state';
import { IRegisterRequest } from '../../../../shared/models/auth/auth-request.model';
import { usernameAvailabilityValidator } from '../../../../shared/validators/username-availability.validator';
import { emailAvailabilityValidator } from '../../../../shared/validators/email-availability.validator';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IS_LOADING } from '../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../shared/stores/loader/loader.actions';
import { REGISTER } from '../../../../shared/stores/auth/auth.actions';
import { ISelectedCountry } from '../../../../shared/models/country.model';
import {
  ALPHABETS_AND_SPACE_REGEX,
  EMAIL_REGEX,
  USERNAME_REGEX,
} from '../../../../shared/utils/regex.constants';
import { PasswordValidators } from '../../../../shared/validators/password.validator';

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
      Validators.pattern(ALPHABETS_AND_SPACE_REGEX),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(ALPHABETS_AND_SPACE_REGEX),
    ]),
    username: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(USERNAME_REGEX),
      ],
      asyncValidators: [usernameAvailabilityValidator(this._httpClient)],
    }),
    email: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(EMAIL_REGEX),
      ],
      asyncValidators: [emailAvailabilityValidator(this._httpClient)],
    }),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
      PasswordValidators.containsSpecialChar(),
      PasswordValidators.containsNumber(),
      PasswordValidators.containsUppercase(),
      PasswordValidators.containsLowercase(),
    ]),
    country: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    countryTag: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
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
      country: this.registerForm.get('country')?.value,
      countryTag: this.registerForm.get('countryTag')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'REGISTER_BTN' }));
    this._store.dispatch(REGISTER({ payload: data }));
  }

  public onCountrySelected(selectedCountry: ISelectedCountry) {
    if (selectedCountry.value) {
      this.registerForm.patchValue({
        country: selectedCountry.label,
        countryTag: selectedCountry.value,
      });
    } else {
      this.registerForm.patchValue({
        country: '',
        countryTag: '',
      });
    }
  }

  public onCountryBlur(): void {
    this.registerForm.get('country')?.markAsTouched();
  }
}
