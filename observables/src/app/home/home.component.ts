import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval, Observable, Observer, Subscription} from 'rxjs'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  firstObsSubscription : Subscription

  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    const customIntervalObservable = new Observable((observer : Observer<number>) => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        //Will stop 
        if(count === 2) {
          observer.complete()
        }
        if(count > 3) {
          observer.error(new Error('Counter is greater than 3'))
        }
        count++
      }, 1000)
    })


     //Operators can transform data , rxjs provides a ton of built in operators
    

    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return `Round: ${data + 1}` 
    })).subscribe(data => {
      //Does something with observable
      console.log(data)
      //Handle error
    }, error => {
      console.log(error)
      alert(error)
      //Handle the completition of the observable
      //Also, when completed the observable come to a complete hault.
    }, () => {
      console.log('Completed')
    })

    

    //Subscribed with no pipe or operators
    // this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    //   //Does something with observable
    //   console.log(data)
    //   //Handle error
    // }, error => {
    //   console.log(error)
    //   alert(error)
    //   //Handle the completition of the observable
    //   //Also, when completed the observable come to a complete hault.
    // }, () => {
    //   console.log('Completed')
    // })
  }

  //Custom observables don`t stop because you are no longer interested on then.
  //To avoid memory links you need to unsubscribe to the observable.
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe()
  }

}
