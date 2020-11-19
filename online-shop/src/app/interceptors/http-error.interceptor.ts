import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)

      .pipe(
        retry(1),

        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.log(error.error);
          if (error.error instanceof ErrorEvent) {
            // client-side error

            errorMessage = `Error: ${error.error}`;
          } else {
            // server-side error

            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
          }
          this.errorService.add(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
