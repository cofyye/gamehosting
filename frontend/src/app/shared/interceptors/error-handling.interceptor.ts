import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { IAcceptResponse } from '../models/response.model';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const error: IAcceptResponse = err.error as IAcceptResponse;

        if (error?.success === false) {
          // this._messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: error?.message,
          // });
        } else {
          // this._messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail:
          //     'An error occurred. Please report this to the administrator.',
          // });
        }

        return throwError(() => err);
      })
    );
  }
}
