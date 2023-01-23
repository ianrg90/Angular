import { Injectable } from '@angular/core';


//It`s better to provide like this, however we are going to use the providers array method to show how it`s done with 
//Standalone components

// @Injectable({ providedIn: 'root' })
// export class AnalyticsService {
//   registerClick() {
//     console.log('Clicked!');
//   }
// }

@Injectable()
export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}
