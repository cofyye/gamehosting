import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const INTEGER_REGEX = /^-?\d+$/;

export function isIntValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = INTEGER_REGEX.test(control.value);
    return isValid ? null : { notInteger: true };
  };
}
