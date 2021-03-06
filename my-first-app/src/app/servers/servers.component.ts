import { Component, OnInit } from '@angular/core';

@Component({
  //selector can be call as html attributes
  //selector: `[app-servers]`,
  //or like css classes
  selector: '.app-servers',
  /*template can be passed like this:
  template: `<app-server></app-server><app-server></app-server>`
  */
  templateUrl: './servers.component.html',
  //The same goes to styles, you can call style props and write the styles directly here
  //style: `[h3: {color: red;}]`
  styles: [`
    .fiveMore {
      color: white;
    }

  `]

})
export class ServersComponent implements OnInit {
    allowAddServer: boolean = false
    serverCreationStatus: string = 'No server was created'
    serverName:string = ''
    userName: string = ''
    serverCreated: boolean = false
    servers: string[] = ['Test1' , 'Test2', 'Test3']
    showSecret: boolean = false
    clicks: any[] = []
    
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  enableButton(){
    this.allowAddServer = !this.allowAddServer
  }

  addServer(){
    this.serverCreated = true
    this.serverCreationStatus = 'Server was created successfuly. Name is ' + this.serverName 
    this.servers.push(this.serverName)
  }

  getServerName(e: Event){
    this.serverName = (<HTMLInputElement>e.target).value  
  }

  onToggleSecret(){
    this.showSecret = !this.showSecret
    this.clicks.push(new Date())
  }
  
}
