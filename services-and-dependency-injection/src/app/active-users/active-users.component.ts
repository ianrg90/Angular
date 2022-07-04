import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {

  users : string[] = []

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.users = this.userService.activeUsers
  }

  onSetToInactive(i : number){
    this.userService.toggleToInactive(i)
  }
  
}
