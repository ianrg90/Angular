import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef
  @ViewChild('ammountInput') ammount: ElementRef
  @Output () addedIngredient = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(){
    this.addedIngredient.emit(new Ingredient(this.name.nativeElement.value, this.ammount.nativeElement.value))
  }


}
