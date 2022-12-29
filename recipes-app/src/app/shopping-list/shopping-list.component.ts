import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogginService } from '../loggin.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription : Subscription;

  constructor(private slService: ShoppingListService, private logginService: LogginService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

      this.logginService.printLog('Hello from shopping-list component ngOnInit')
      
  }

  onEditItem(index: number) {
    this.slService.startEditing.next(index)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
