import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { TripPlanPopupComponent } from './home/components/trip-plan-popup/trip-plan-popup.component';
import { ServicesComponent } from './home/components/services-component/services.component';
import { InviewDirective } from '../shared/in-view.directive';
import { CoupleDestinationComponent } from './home/components/couple-destination-component/coupleDestination.component';
import { ExploreBannerComponent } from './home/components/explore-banner/banner.component';
import { PackageDetails } from './packgeDetailsPage/packageDetails';



@NgModule({
  declarations: [
    HomeComponent,
    TripPlanPopupComponent,
    ServicesComponent,
    CoupleDestinationComponent,
    ExploreBannerComponent,
    PackageDetails
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
