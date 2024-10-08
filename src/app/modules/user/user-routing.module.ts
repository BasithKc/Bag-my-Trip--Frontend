import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {  NgModule } from "@angular/core";
import { PackageDetails } from "./packgeDetailsPage/packageDetails";
import { AboutComponent } from "./about/about.component";
import { InfoComponent } from "./packgeDetailsPage/components/information/info.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'package-details', component: PackageDetails,
    children: [
      {path: 'information', component: InfoComponent},
    ]
  },
  {path: 'about', component: AboutComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }