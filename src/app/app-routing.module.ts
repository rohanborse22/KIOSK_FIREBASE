import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CaseDetailsComponent } from "./case-details/case-details.component";

const routes: Routes = [
  { path : '', redirectTo: 'home', pathMatch: 'prefix' },
  { path : 'home', component: HomeComponent },
  { path : 'case-details', component: CaseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CaseDetailsComponent]
