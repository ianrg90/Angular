import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //numbers = [1, 2, 3, 4, 5];
  oddNumbers: number[] = [1, 3, 5];
  evenNumbers: number[] = [2, 4];
  value: number = 10

  onlyOdd = false;

  handleBackgroundColor(number){
    if(number % 2 !== 0){
      return 'yellow'
    }else{
      return null
    }
  }
}
