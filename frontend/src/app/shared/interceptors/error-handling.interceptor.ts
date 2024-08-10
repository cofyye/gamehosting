import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { IAcceptResponse } from '../models/response.model';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const _toasterService = inject(ToasterService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const error: IAcceptResponse = err.error as IAcceptResponse;

      if (error?.success === false) {
        _toasterService.error(error?.message, 'Error');
      } else {
        _toasterService.error(
          'An error occurred. Please report this to the administrator.',
          'Error'
        );
      }

      return throwError(() => err);
    })
  );
};
