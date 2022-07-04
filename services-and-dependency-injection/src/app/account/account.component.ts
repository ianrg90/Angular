import { Component, Input} from '@angular/core';
import { LoginService } from '../login.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  //By not passing the AccountService to the provider we do not create new instances of the class
  //Hence will be the same instance created in the app component
  //providers: [LoginService, AccountService],
  //providers: [LoginService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  

  constructor(private loginService: LoginService, private accountService: AccountService){

  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    //this.loginService.logStatusChange(status
    this.accountService.statusUpdated.emit(status)
  }
}
