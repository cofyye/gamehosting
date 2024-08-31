import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (
      (typeof value !== 'number' && typeof value !== 'string') ||
      !/^-?\d*\.?\d*$/.test(value.toString())
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
