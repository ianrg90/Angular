import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-challenge',
  templateUrl: './form-challenge.component.html',
  styleUrls: ['./form-challenge.component.scss']
})
export class FormChallengeComponent  {

  @ViewChild('form') formElement: NgForm
  options = ['Basic', 'Advanced', 'Pro'];
  selectedOption = 'Advanced';
  formData = {
    email: '',
    subscriptionType: '',
    password: ''
  }
  submitted = false


  submitForm(){
    this.submitted = true
    
    this.formData.email = this.formElement.value.email
    this.formData.subscriptionType = this.formElement.value.subscriptionType
    this.formData.password = this.formElement.value.password

    this.formElement.reset()
  }

  

}
