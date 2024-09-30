import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { TripPlanPopupComponent } from './components/home/components/trip-plan-popup/trip-plan-popup.component';
import { ServicesComponent } from './components/home/components/services-component/services.component';
import { InviewDirective } from '../shared/in-view.directive';
import { CoupleDestinationComponent } from './components/home/components/couple-destination-component/coupleDestination.component';
import { ExploreBannerComponent } from './components/home/components/explore-banner/banner.component';



@NgModule({
  declarations: [
    HomeComponent,
    TripPlanPopupComponent,
    ServicesComponent,
    CoupleDestinationComponent,
    ExploreBannerComponent,
    InviewDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
