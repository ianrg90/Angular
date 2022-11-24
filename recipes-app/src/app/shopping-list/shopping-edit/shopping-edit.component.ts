import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f') shoppingListForm : NgForm

  subscription : Subscription
  editMode = false
  editedItemIndex : number
  editedItem : Ingredient
  

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe((index : number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index)

      this.shoppingListForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }


  onSubmitItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)

    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }

    this.editMode = false
    form.reset()
  }

  onClearForm(){
    this.editMode = false
    this.shoppingListForm.reset()
  }

  onDeleteItem(){
    this.onClearForm()
    this.slService.deleteIngredient(this.editedItemIndex)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
