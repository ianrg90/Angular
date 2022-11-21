import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders: string[] = ['Male', 'Female'];
  signupForm: FormGroup;
  forbiddenUserNames : string[] = ['Chris', 'Anna'];

  constructor(private formBuilder : FormBuilder){
    
  }


  ngOnInit () {

    this.signupForm = new FormGroup({
      // Just reference the validators , do not call then
      'userData' : new FormGroup({
        'username': new FormControl(null,[ Validators.required, this.forbiddenNames.bind(this)]),//Bind custom validator here
        //@ts-ignore
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), //Third argument is for the async validators, Can`t figure out error, works with ts-ignore
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    })

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })

    // this.signupForm.statusChanges.subscribe((value) => {
    //   console.log(value)
    // })

    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Ian',
    //     'email': 'ian@halaxy.com'
    //   },
    //   'gender': 'Male',
    //   'hobbies': []
    // })
  }

  onSubmit(){
    console.log(this.signupForm)  

    this.signupForm.reset()
  }

  onAddHobbie(){
    
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required))
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls 
  }

//Custom validator for username field
  forbiddenNames(control: FormControl):{[s: string]: boolean} | null {  
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden' : true}
    }
    return null
  }

  //Async validator in case you need to make a request to validate

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any>{
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            if(control.value === "test@test.com"){
              resolve({'emailIsForbidden': true})
            }else {
              resolve(null)
            }
        }, 1500)
      })

      return promise
  }
}
