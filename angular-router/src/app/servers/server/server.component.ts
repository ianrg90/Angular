import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data} from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    //Getting data with the resolver instead of the URL params. Perfect approach for async data fetching
    this.route.data.subscribe((data: Data) => {
      this.server = data.serversPrevData
    })

    //const id = +this.route.snapshot.params['id']
    //this.server = this.serversService.getServer(id);

    ////Careful always when you get a parameter from the url is going to be type string.
    //this.route.params.subscribe((params: Params) => {
    //  this.server = this.serversService.getServer(+params['id'])
    //})
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
