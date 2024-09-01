import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UUID_V4_REGEX } from '../utils/regex.constants';

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = UUID_V4_REGEX.test(control.value);
    return isValid ? null : { invalidUuid: true };
  };
}
