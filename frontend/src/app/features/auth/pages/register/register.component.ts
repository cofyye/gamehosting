import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { IRegisterRequest } from '../../models/auth-request.model';
import { register } from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  constructor(private readonly _store: Store<AppState>) {}

  public onRegister(): void {
    const data: IRegisterRequest = {
      email: 'dwadad@dawdad.com',
      firstName: 'filip',
      lastName: 'lakicevic',
      username: 'cofyye',
      password: '12345',
      pinCode: '123',
    };

    console.log(data);

    this._store.dispatch(register({ payload: data }));
  }
}
