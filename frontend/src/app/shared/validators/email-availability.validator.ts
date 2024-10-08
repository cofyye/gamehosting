import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { IDataAcceptResponse } from '../models/response.model';

export function emailAvailabilityValidator(
  _httpClient: HttpClient
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) =>
        _httpClient
          .post<IDataAcceptResponse<boolean>>(
            `${environment.API_URL}/auth/availability/email/${value}`,
            {}
          )
          .pipe(
            map((response) => (response.data ? { emailTaken: true } : null)),
            catchError(() => of(null))
          )
      ),
      first()
    );
  };
}
