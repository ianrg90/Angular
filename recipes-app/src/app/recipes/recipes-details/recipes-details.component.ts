import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {

  @Input() detailedRecipe: Recipe
  openDropdown: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(){
    this.openDropdown = !this.openDropdown
    console.log(this.openDropdown)
  }

}
