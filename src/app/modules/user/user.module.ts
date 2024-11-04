import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { TripPlanPopupComponent } from './home/components/trip-plan-popup/trip-plan-popup.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './home/components/services-component/services.component';
import { InviewDirective } from '../shared/in-view.directive';
import { PackageComponent } from './package/package.component';
import { PackageCardComponent } from './package/components/package-card/packageCard.component';
import { CoupleDestinationComponent } from './home/components/couple-destination-component/coupleDestination.component';
import { ExploreBannerComponent } from './home/components/explore-banner/banner.component';
import { PackageDetails } from './packgeDetailsPage/packageDetails';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './packgeDetailsPage/components/information/info.component';
import { BookingComponent } from './packgeDetailsPage/components/bookingForm/booking.component';
import { TourPlanComponent } from './packgeDetailsPage/components/tourPlan/tour-plan-component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './packgeDetailsPage/components/gallery/gallery.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    PackageComponent,
    TripPlanPopupComponent,
    ServicesComponent,
    CoupleDestinationComponent,
    ExploreBannerComponent,
    InviewDirective,
    PackageCardComponent,
    AboutComponent,
    InfoComponent,
    BookingComponent,
    TourPlanComponent,
    GalleryComponent,
    PackageDetails,
    InviewDirective,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class UserModule { }
