import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @ViewChild('f') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error : string  = null 

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    //if form is invalid prevent submit
    if (!this.authForm.valid) {
        return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true

    if(this.isLoginMode) {
      authObs = this.authService.signin(email, password)
    } else {
      authObs =  this.authService.signup(email, password)
    }

    authObs.subscribe(
      response => {
          console.log(response);
          this.isLoading = false
          this.router.navigate(['/recipes'])

      },
      errorMessage => {
          this.error = errorMessage
          this.isLoading = false
      }
    );

    this.authForm.reset();
  }
}
