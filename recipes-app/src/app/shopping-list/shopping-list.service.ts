import { ThisReceiver } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  //IF you push won`t change the UI because you only adding it to a copy of the original array (using slice)
  //One solution is to remove the slice and provide the original array
  //or USE THE method above (EventEmitter)
  getShoppingList() {
    return this.ingredients.slice();
  }

 
  addItems(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredientsFromRecipe(ingredients : Ingredient[]){
    //This will emit a lot of events
    //for(let ingredient of ingredients){
    //  this.addItems(ingredient) 
    //}

    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
