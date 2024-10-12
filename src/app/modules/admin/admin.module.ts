import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http"
import { AdminHeaderComponent } from "./components/shared/header/header.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommonModule } from "@angular/common";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";

@NgModule({
  declarations: [
    LoginComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    DashboardComponent,
    ToursListingComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})

export class AdminModule {}