import { Injectable } from "@angular/core";

//DUMMY service to demonstrate service instances differences depending on how it is provided

@Injectable({
    providedIn: 'root'
})

export class LogginService {
    lastLog : string

    printLog(message: string) {
        console.log(message)
        console.log(this.lastLog)
        this.lastLog = message
    }
}