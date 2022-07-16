import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  //Make it private so it can be accessed from outside(only by the get method implemented)
  private recipes: Recipe[] = [
    new Recipe(
      'First recipe',
      'This is a delicious recipe under test',
      'https://i.guim.co.uk/img/media/ab57a5ddd2dda167ceae93b79579256261fcb66c/536_716_6442_3867/master/6442.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=a1e7e172765f2850ee1e6ec706a34086',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      'Second recipe',
      'This is a delicious second test recipe',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F20%2F212721-Indian-Chicken-Curry-Murgh-Kari-mfs_004.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private shoppingListService : ShoppingListService){


  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredientsFromRecipe(ingredients)
  } 
}
