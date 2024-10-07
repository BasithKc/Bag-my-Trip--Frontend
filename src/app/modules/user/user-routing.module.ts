import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PackageComponent } from "./package/package.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'package', component: PackageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }