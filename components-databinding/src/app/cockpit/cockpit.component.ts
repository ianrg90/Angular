import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output () blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>()
  //newServerName: string = '';
  //newServerContent: string = '';
  //Using ViewChild
  @ViewChild ("serverContentInput") serverContentInput: ElementRef

  onAddServer(inputValue: HTMLInputElement) {
    //this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent})
    this.serverCreated.emit({serverName: inputValue.value, serverContent: this.serverContentInput.nativeElement.value})

  }

  onAddBlueprint(inputValue: HTMLInputElement) {
   this.blueprintCreated.emit({blueprintName: inputValue.value, blueprintContent: this.serverContentInput.nativeElement.value})
  }
}
