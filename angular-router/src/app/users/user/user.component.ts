import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //Suppose you want to navigate to the same route but changing just the params. The params in the URL will change. But the UI will not
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    //This approach will fix the problem. Should use instead whenever you have navigation to tho the same route inside the route.
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }
}
