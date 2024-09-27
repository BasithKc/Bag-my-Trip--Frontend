import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { TripPlanPopupComponent } from './components/trip-plan-popup/trip-plan-popup.component';
import { ServicesComponent } from './components/services-component/services.component';
import { InviewDirective } from '../shared/in-view.directive';



@NgModule({
  declarations: [
    HomeComponent,
    TripPlanPopupComponent,
    ServicesComponent,
    InviewDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
