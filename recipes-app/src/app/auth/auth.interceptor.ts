import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      //take() will take one value from the observable and unsubscrible to you
      take(1),
      //exhaustMap will then get the data from the previous observable and then replace the user observable with the new observable
      //in the chain
      exhaustMap((user) => {
        
        if(!user) {
            return next.handle(req)
        }
        
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
