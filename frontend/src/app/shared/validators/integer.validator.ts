import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UNSIGNED_INTEGER_REGEX } from '../utils/regex.constants';

export function isUnsignedIntValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = UNSIGNED_INTEGER_REGEX.test(control.value);
    return isValid ? null : { notInteger: true };
  };
}
