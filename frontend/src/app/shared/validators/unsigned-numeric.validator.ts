import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UNSIGNED_NUMERIC_WITH_TWO_DECIMALS_REGEX } from '../utils/regex.constants';

export function unsignedNumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = UNSIGNED_NUMERIC_WITH_TWO_DECIMALS_REGEX.test(
      control.value
    );
    return isValid ? null : { notUnsignedNumeric: true };
  };
}
