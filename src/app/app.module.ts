import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform  } from '@angular/core';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { CountToModule } from 'angular-count-to';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    NgPipesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    CountToModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
 

 export interface Feed {
  Address?: string;
  kiosk_id?: string;
  datetime?: string;
}

export interface Kiosk {
  Address: string;
  name: string;

}

export interface Cases {
  kiosk_id: string;
  datetime: string;
}