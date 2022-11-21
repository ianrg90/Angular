import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-challenge',
  templateUrl: './form-challenge.component.html',
  styleUrls: ['./form-challenge.component.scss']
})
export class FormChallengeComponent implements OnInit {

  projectForm: FormGroup
  forbiddenName = 'Test'
  projectStatuses = ['Stable', 'Critical', 'Finished']

  constructor() { }

  ngOnInit(): void {

    this.projectForm = new FormGroup({
      //@ts-ignore
      'projectName' : new FormControl(null, Validators.required, this.asyncForbiddenName.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    })
  }

  // checkForbiddenName(control: FormControl) : {[s: string]: boolean} | null {
  //   if(control.value === this.forbiddenName) {
  //     return {'nameIsForbidden' : true}
  //   }
  //   return null
  // }

  //async validator

  asyncForbiddenName(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === this.forbiddenName){
          resolve({'nameIsForbidden': true})
        }else
        resolve(null)
      }, 1500)
    })

    return promise
  }

  onSubmit(){
    console.log(this.projectForm)
  }

}
