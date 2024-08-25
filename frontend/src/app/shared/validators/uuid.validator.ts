import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = UUID_V4_REGEX.test(control.value);
    return isValid ? null : { invalidUuid: true };
  };
}
