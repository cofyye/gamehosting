import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UNSIGNED_INTEGER_REGEX } from '../utils/regex.constants';

export function unsignedNumericValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (
      (typeof value !== 'number' && typeof value !== 'string') ||
      !UNSIGNED_INTEGER_REGEX.test(value.toString())
    ) {
      return { numeric: `The ${controlName} must be a number.` };
    }

    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return { numeric: `The ${controlName} must be a valid number.` };
    }

    const decimalPlaces = value.toString().split('.')[1];
    if (decimalPlaces && decimalPlaces.length > 2) {
      return {
        numeric: `The ${controlName} must have a maximum of 2 decimal places.`,
      };
    }

    return null;
  };
}
