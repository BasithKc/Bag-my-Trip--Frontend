import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";
import { AddToursComponent } from "./components/Tours/add tours/add-tours.component";
import { CategoriesComponent } from "./components/Tours/tour categories/categories.component";
import { TourBookingsComponent } from "./components/Tours/bookings/bookings.component";
import { AdminGuard } from "./guards/admin.guard";
import { EditTourComponent } from "./components/Tours/edit tour/edit-tour.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tours' , children: [
        {path: 'all', component: ToursListingComponent},
        {path: 'add', component: AddToursComponent},
        {path: 'categories', component: CategoriesComponent},
        {path: 'bookings', component: TourBookingsComponent},
        {path: 'edit/:id', component: EditTourComponent}
      ]},
    ],
  },
  { path: '**', redirectTo: 'dashboard' } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}