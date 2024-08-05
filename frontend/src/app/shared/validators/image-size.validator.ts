import { AbstractControl, ValidatorFn } from '@angular/forms';
import { functions } from '../utils/functions';
import { environment } from '../../../environments/environment';

export function imageSizeValidator(
  maxSize: number = environment.IMAGE_MAX_UPLOAD_SIZE
): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file && file.size > maxSize) {
      return {
        imageSize: {
          actualSize: functions.formatBytes(file.size),
          maxSize: functions.formatBytes(maxSize),
        },
      };
    }
    return null;
  };
}
