import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

//Always use when you will inject some other service into the service
//and only add in the service which will receive the other service
@Injectable()
export class AccountService {
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Test Account',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      constructor(private loginService: LoginService){

      }

      addAccount(name: string, status: string){
        this.accounts.push({name: name, status: status})
        this.loginService.logStatusChange(status)
      }

      updateStatus(id: number, status: string){
        this.accounts[id].status = status
        this.loginService.logStatusChange(status)

      }
}