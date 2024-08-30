import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value !== 'number' && typeof value !== 'string') {
      return { numeric: 'The value must be a number.' };
    }

    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return { numeric: 'The value must be a valid number.' };
    }

    const decimalPlaces = value.toString().split('.')[1];
    if (decimalPlaces && decimalPlaces.length > 2) {
      return {
        numeric: 'The value must have a maximum of 2 decimal places.',
      };
    }

    return null;
  };
}
