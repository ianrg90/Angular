import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { map, Subject, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  //can use Subject to forward errors or data
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(postData: Post) {
    const endpoint =
      'https://angular-http-requests-ee378-default-rtdb.firebaseio.com/post.json';
    //Angular will convert to JSON automatically , no need to use JSON.stringify(...)
    const body = postData;

    this.http
      .post<{ name: string }>(endpoint, body, { observe: 'response' }) // the third argument will change how angular returns the response
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    //If you need to set multiple query params

    // let searchParams = new HttpParams()
    // searchParams = searchParams.append('print', 'pretty')
    // searchParams = searchParams.append('custom', 'key')

    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-requests-ee378-default-rtdb.firebaseio.com/post.json',
        {
          headers: new HttpHeaders({
            'Custom-header': 'hello',
          }),
          // then you pass serachParams here
          params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }

          return postsArray;
        }),
        //another way to handling errors
        catchError((errorRes) => {
          //send to analytics server
          return throwError(() => new Error(errorRes));
        })
      );
  }

  //Those are used to have control over the steps of the response

  deletePosts() {
    return this.http
      .delete(
        'https://angular-http-requests-ee378-default-rtdb.firebaseio.com/post.json',
        { 
          observe: 'events',
          responseType: 'text' // change the response type 
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);

          if (event.type === HttpEventType.Sent) {
            //do somethingg
          }

          //enum imported from angular
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
