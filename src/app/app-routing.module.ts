import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CaseDetailsComponent } from "./case-details/case-details.component";
import {LoginComponent} from "./login/login.component";
const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'home', component: HomeComponent },
  { path : 'login', component: LoginComponent },
  { path : 'case-details/:id', component: CaseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CaseDetailsComponent]
