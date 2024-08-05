import { AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';

export function imageExtensionValidator(
  allowedExtensions: string[] = environment.IMAGE_EXTENSIONS
): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file) {
      const extension =
        '.' + file.name.split(file.name[file.name.lastIndexOf('.')])[1];

      if (!allowedExtensions.includes(extension)) {
        return {
          imageExtension: {
            actualExtension: extension,
            allowedExtensions: allowedExtensions.join(', '),
          },
        };
      }
    }
    return null;
  };
}
