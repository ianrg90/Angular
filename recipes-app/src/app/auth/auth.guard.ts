import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            //get the latest value and unsubscrible for us, avoid side effects and memory leaks
            take(1),
            map(user => {
            const isAuth = !!user

            if(isAuth) {
                //if user is true let route load
                return true
            }

            //else navigate to auth page
            // new way of doing it, you can also use tap here and manually change route 
            return this.router.createUrlTree(['auth'])
        }))
    }

}