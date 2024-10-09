import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./admin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http"

@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})

export class AdminModule {}