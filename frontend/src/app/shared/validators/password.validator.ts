import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_SPECIALCHAR_REGEX,
  PASSWORD_UPPERCASE_REGEX,
} from '../utils/regex.constants';

export class PasswordValidators {
  static containsSpecialChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !PASSWORD_SPECIALCHAR_REGEX.test(control.value)) {
        return {
          nonSpecialChar: true,
        };
      }
      return null;
    };
  }

  static containsNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !PASSWORD_NUMBER_REGEX.test(control.value)) {
        return { nonNumber: true };
      }
      return null;
    };
  }

  static containsUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !PASSWORD_UPPERCASE_REGEX.test(control.value)) {
        return {
          nonUppercase: true,
        };
      }
      return null;
    };
  }

  static containsLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !PASSWORD_LOWERCASE_REGEX.test(control.value)) {
        return {
          nonLowercase: true,
        };
      }
      return null;
    };
  }
}
