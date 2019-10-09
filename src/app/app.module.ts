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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// tost import 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule,ToastContainerModule } from 'ngx-toastr';
// for AngularFireDatabase
import { AngularFireAuthModule } from "@angular/fire/auth";
// date time ago library
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    TimeAgoPipe
  ],
  imports: [
    NgxPaginationModule,
    NgPipesModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CountToModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // AIzaSyCfDCU_Ht7oL0a7V515xwjxueIou-dAv_c
      // AIzaSyCpMCI0p-Hm-AdUW66-wR9XaiGDyN4q0CU
      apiKey : 'AIzaSyB7xgr156h2ZbXkDJxFkgaw5fpRtbwgPXY',
    }),
    AgmSnazzyInfoWindowModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastContainerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
     
    }) // ToastrModule added
  ],
  providers: [DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy}],
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
  case_status: any;
  button_id: any;
  kiosk_id: string;
  datetime: string;
}