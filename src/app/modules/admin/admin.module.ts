import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http"
import { AdminHeaderComponent } from "./components/shared/header/header.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommonModule } from "@angular/common";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";
import { AddToursComponent } from "./components/Tours/add tours/add-tours.component";
import { BookingComponent } from "../user/packgeDetailsPage/components/bookingForm/booking.component";

@NgModule({
  declarations: [
    LoginComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    DashboardComponent,
    ToursListingComponent,
    AddToursComponent,
    BookingComponent,
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ]
})

export class AdminModule {}