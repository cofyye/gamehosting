import { HttpInterceptorFn } from '@angular/common/http';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    withCredentials: true,
  });

  return next(req);
};
