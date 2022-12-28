import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  register?: boolean;
}

export interface LocalStorageAuthData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiKey = 'AIzaSyDBJT7tC7_zJ9dxgoYq1UJE0W34U0d2sIM';
  //Like subject but we can get access even if the user loged before that point of time 
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer : any;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const savedUser : LocalStorageAuthData = JSON.parse(localStorage.getItem('@User'))

    if(!savedUser) {
      return
    }

    const userToLoad = new User(savedUser.email, savedUser.id, savedUser._token, new Date(savedUser._tokenExpirationDate))

    if(userToLoad.token){
      this.user.next(userToLoad)
      const tokenRemainingTime = new Date(savedUser._tokenExpirationDate).getTime() - new Date ().getTime()
      this.autoLogout(tokenRemainingTime)
      this.router.navigate(['/recipes'])
    }    
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  logout() {
    //Clear user and remove it from local storage
    this.user.next(null);
    localStorage.removeItem('@User')

    //clear timer 
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }

    //set timer to null and navigate to auth page
    this.tokenExpirationTimer = null
    this.router.navigate(['/auth'])
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.errorHandler(errorResponse);
        }),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.errorHandler(errorResponse);
        }),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, id, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('@User', JSON.stringify(user))
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error has occurred !';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered !';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password !';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by administrator !';
        break;
    }

    return throwError(errorMessage);
  }
}
