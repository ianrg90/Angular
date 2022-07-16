import { Component, Input, OnInit} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {

  @Input() recipe: Recipe

  constructor(private recipeService : RecipeService) {
    
   }

   ngOnInit(): void {
     
   }

   onAddToShoppingList(ingredients: Ingredient[]){
    this.recipeService.addIngredientsToShoppingList(ingredients)
   }

}
