import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent  {

  @ViewChild('nameInput') name: ElementRef
  @ViewChild('ammountInput') ammount: ElementRef

  constructor(private shoppingListService: ShoppingListService) { }

  onAddIngredient(){
    const nameRef = this.name.nativeElement.value
    const amountRef = this.ammount.nativeElement.value
    const newIngredient = new Ingredient(nameRef, amountRef)
    this.shoppingListService.addItems(newIngredient)
  }

 


}
