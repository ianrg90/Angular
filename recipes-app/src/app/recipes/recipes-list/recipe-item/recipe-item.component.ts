import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input () item: {name: string, description: string, imagePath: string}
  @Output() selectedItem = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectItem(){
    this.selectedItem.emit()
  }

}
