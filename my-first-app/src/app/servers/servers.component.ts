import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //template can be passed like this:
  //template: `<app-server></app-server><app-server></app-server>`
  templateUrl: './servers.component.html',
  //The same goes to styles, you can call style props and write the styles directly here
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
