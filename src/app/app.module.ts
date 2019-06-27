import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { CountToModule } from 'angular-count-to';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import {AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    NgxPaginationModule,
    NgPipesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    CountToModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCpMCI0p-Hm-AdUW66-wR9XaiGDyN4q0CU'
    }),
    AgmSnazzyInfoWindowModule
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