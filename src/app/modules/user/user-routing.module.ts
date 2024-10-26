import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {  NgModule } from "@angular/core";
import { PackageDetails } from "./packgeDetailsPage/packageDetails";
import { AboutComponent } from "./about/about.component";
import { InfoComponent } from "./packgeDetailsPage/components/information/info.component";
import { PackageComponent } from "./package/package.component";
import { TourPlanComponent } from "./packgeDetailsPage/components/tourPlan/tour-plan-component";
import { GalleryComponent } from "./packgeDetailsPage/components/gallery/gallery.component";
import { UserComponent } from "./user.component";
import { TourDetailsResolver } from "./services/tour-detials.resolver";

const routes: Routes = [
  {path: '', component: UserComponent, 
    children: [
      {path: '', component: HomeComponent},
      {path: 'package-details/:tourId', component: PackageDetails,
        resolve: {tourDetials: TourDetailsResolver},
        children: [
          {path: 'information', component: InfoComponent},
          {path: 'plan', component: TourPlanComponent},
          {path: 'gallery', component: GalleryComponent},
          { path: '', redirectTo: 'information', pathMatch: 'full' }
        ]
      },
      {path: 'about', component: AboutComponent},
      {path: 'package', component: PackageComponent}
    ]
  },
  {path: '**', redirectTo: ''}
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }