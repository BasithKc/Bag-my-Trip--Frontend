import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { TripPlanPopupComponent } from './components/trip-plan-popup/trip-plan-popup.component';



@NgModule({
  declarations: [
    HomeComponent,
    TripPlanPopupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
