import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddTitleModalComponent } from './add-title-modal/add-title-modal.component';

@NgModule({
  declarations: [
    AppComponent, // Declare your main app component
    AddTitleModalComponent // Declare the AddTitleModalComponent here
  ],
  imports: [
    BrowserModule, // Import the browser module
    IonicModule.forRoot(), // Initialize Ionic module
    AppRoutingModule, // Import routing module
    HttpClientModule ,// Import HttpClientModule for API calls
    FormsModule, // Add FormsModule for ngModel
    ReactiveFormsModule // Add ReactiveFormsModule if needed
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } // Provide the route reuse strategy
  ],
  bootstrap: [AppComponent] // Bootstrap the main app component
})
export class AppModule {}
