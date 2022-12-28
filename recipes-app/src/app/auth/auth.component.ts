import { Component, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild('f') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error : string  = null 
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  private closeSub : Subscription

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
          this.showErrorAlert(errorMessage)
          this.isLoading = false
      }
    );

    this.authForm.reset();
  }

  //for ngIf approach
  onHandleError(){
    this.error = null
  }

  //This approach should not be used. Use ngIf instead. Just use this if you have a strong reason to do so
  private showErrorAlert(message: string) {
    // Valid ts syntax however won`t work because Angular needs more 
    // const alertCmp = new AlertComponent()

    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(AlertComponent)
    componentRef.instance.message = message

    //ONLY exception to the use of subscription with event emmiter
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }


}
