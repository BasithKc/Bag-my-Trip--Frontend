import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren:()=> {
    return import('./bag-my-trip-frontend/src/app/modules/user/user.module').then(m => m.UserModule);
  }},
  {path: 'admin', loadChildren: () => {
    return import('./bag-my-trip-frontend/src/app/modules/admin/admin.module')
    .then(m => m.AdminModule)
    },
  },
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
