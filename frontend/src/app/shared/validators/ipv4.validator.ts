import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IPV4_REGEX } from '../utils/regex.constants';

export function ipv4Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = IPV4_REGEX.test(control.value);
    return isValid ? null : { invalidIPv4: true };
  };
}
