import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { TripPlanPopupComponent } from './home/components/trip-plan-popup/trip-plan-popup.component';
import { ServicesComponent } from './home/components/services-component/services.component';
import { CoupleDestinationComponent } from './home/components/couple-destination-component/coupleDestination.component';
import { ExploreBannerComponent } from './home/components/explore-banner/banner.component';
import { InviewDirective } from '../shared/in-view.directive';
import { PackageComponent } from './package/package.component';
import { PackageCardComponent } from './package/components/package-card/packageCard.component';



@NgModule({
  declarations: [
    HomeComponent,
    PackageComponent,
    TripPlanPopupComponent,
    ServicesComponent,
    CoupleDestinationComponent,
    ExploreBannerComponent,
    InviewDirective,
    PackageCardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
