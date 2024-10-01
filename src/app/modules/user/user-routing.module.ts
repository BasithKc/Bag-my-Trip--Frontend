import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { PackageDetails } from "./packgeDetailsPage/packageDetails";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'package-details', component: PackageDetails}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }