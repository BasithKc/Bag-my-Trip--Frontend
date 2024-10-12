import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ToursListingComponent } from "./components/Tours/tours listing/tours-listing.component";

const routes: Routes = [
  {path: '', component: AdminLayoutComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'tours/all', component: ToursListingComponent},

    ]
  },
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}