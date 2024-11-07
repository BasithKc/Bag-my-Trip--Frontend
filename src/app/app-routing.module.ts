import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/admin/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin', 
    loadChildren: () =>  import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '', 
    loadChildren: ()=> import('./modules/user/user.module').then(m => m.UserModule)
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }