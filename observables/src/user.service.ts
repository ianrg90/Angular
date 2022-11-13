import {Injectable, EventEmitter} from '@angular/core'
import { Subject } from 'rxjs'

//Modert syntax so you don`t have to pass on the provider on App module 
@Injectable({providedIn : 'root'})

export class UserService {

    // activateEmitter = new EventEmitter<boolean>();
    activateEmitter = new Subject<boolean>()

}