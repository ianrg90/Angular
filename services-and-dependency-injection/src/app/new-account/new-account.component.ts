import { Component} from '@angular/core';
import { LoginService } from '../login.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  //By not passing the AccountService to the provider we do not create new instances of the class
  //Hence will be the same instance created in the app component
  //providers: [LoginService, AccountService],
  //providers: [LoginService]
})
export class NewAccountComponent {

  constructor(private loginService : LoginService, private accountService: AccountService){

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus)
    //this.loginService.logStatusChange(accountStatus)
    
    //console.log('A server status changed, new status: ' + accountStatus);
  }
}
