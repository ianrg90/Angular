import { Component,  EventEmitter,  Input, Output} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent  {

  @Input () item: Recipe

  @Output() selectedItem = new EventEmitter<string>()
  

  constructor(private recipeService: RecipeService) {

  }

  onSelectItem(){
    this.recipeService.recipeSelected.emit(this.item)
  }

}
