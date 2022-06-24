import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    collapsed: boolean = true
    @Output() renderedPage = new EventEmitter<string>()
   
    constructor(){
        
    }

    onPageRender(page: string){
        this.renderedPage.emit(page)
    }


}