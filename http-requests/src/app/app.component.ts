import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading =false;
  error : string | null = null

  private errorSub : Subscription;

  constructor(private http: HttpClient, private postService: PostService) {

  }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })
    this.handleFetchPost()
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData)
  }

  onFetchPosts() {
    this.handleFetchPost()
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  onHandleError(){
    this.error = null
  }

  private handleFetchPost(){
    this.isLoading = true
    this.postService.fetchPosts().subscribe(data => {
      this.loadedPosts = data
      this.isLoading = false
    }, error => {
      this.error = error.message
      this.isLoading = false
    })
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }
}
