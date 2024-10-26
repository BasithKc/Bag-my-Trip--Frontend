import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";
import { AddToursComponent } from "./components/Tours/add tours/add-tours.component";
import { CategoriesComponent } from "./components/Tours/tour categories/categories.component";
import { TourBookingsComponent } from "./components/Tours/bookings/bookings.component";

const routes: Routes = [
  {path: '', component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tours/all', component: ToursListingComponent},
      {path: 'tours/add', component: AddToursComponent},
      {path: 'tours/categories', component: CategoriesComponent},
      {path: 'tours/bookings', component: TourBookingsComponent}
    ],
  },
  {path: 'login', component: LoginComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}