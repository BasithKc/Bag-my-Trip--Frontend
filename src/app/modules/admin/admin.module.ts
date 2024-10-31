import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { AdminHeaderComponent } from "./components/shared/header/header.component";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";
import { AddToursComponent } from "./components/Tours/add tours/add-tours.component";
import { TourBookingsComponent } from "./components/Tours/bookings/bookings.component";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http"
import { CommonModule } from "@angular/common";
import { EditTourComponent } from "./components/Tours/edit tour/edit-tour.component"


@NgModule({
  declarations: [
    LoginComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    ToursListingComponent,
    AddToursComponent,
    TourBookingsComponent,
    EditTourComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ]
})

export class AdminModule {}