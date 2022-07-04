import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UserService {
  activeUsers: string[] = ['Max', 'Ana'];
  inactiveUsers: string[] = ['Ian', 'Jack'];

  constructor(private counterService: CounterService){

  }

  toggleToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.increaseActiveToInactive()
  }

  toggleToAtive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.increaseInactivetoActive()
  }
}
