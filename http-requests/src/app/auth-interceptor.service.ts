import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';

//Run before the request leaves your app

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request its on it`s way');
        console.log(req.url)

        //to modify the request

        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'testKey')
        })
        
        
        //Allow the request to continue
        //return next.handle(req)


        //return the modified request
        return next.handle(modifiedRequest) 
    }
}