import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/admin/guards/admin.guard';

const routes: Routes = [
  {path: '', loadChildren:()=> {
    return import('./modules/user/user.module').then(m => m.UserModule);
  }},
  {path: 'admin', loadChildren: () => {
    return import('./modules/admin/admin.module')
    .then(m => m.AdminModule)
    },
    canActivate: [AdminGuard]  // Add this line

  },
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
