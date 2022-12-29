import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

//Repeated imports across different modules is fine however we can`t have repeated declarations

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //When lazy loading remove from the imports here
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    //it`s used to services to keep the app module leaner. 
    CoreModule,
    SharedModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
