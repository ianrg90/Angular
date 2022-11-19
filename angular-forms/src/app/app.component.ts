import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Fix anoying ts error of not initializing prop "!"
  @ViewChild('f') signupForm!: NgForm;
  defaultQuestion = 'pet';
  answer : "";
  genders = ['Male','Female'];
  user = {
    username : '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  }
  submitted = false

  suggestUserName() {
    const suggestedName = 'Superuser';

    // This approach will override all fields case you just want to fill username and already have other fields completed

    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'teacher',
    //   questionAnswer: 'Control the form by passing the object exact like the form object structure',
    //   gender: 'Male'
    // })

    // This one will target only username field

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }


  //Approach using ANGULAR FORM HANDLING
  // onSubmit(form : NgForm) {
  //   console.log(form)
  // }

  onSubmit(){

    this.submitted = true

    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // You can pass a object like done in setValue() above to reset the fields to desired values if you want
    this.signupForm.reset()
  }
}
