import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren:()=> {
    return import('./modules/user/user.module').then(m => m.UserModule);
  }},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true ,
    useHash: false,

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
