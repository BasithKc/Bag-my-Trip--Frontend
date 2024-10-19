import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthServiceService } from "../services/auth/auth-service.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated()){
      return true
    } else {
      return this.router.navigate(['/admin/login'])
    }
  }
}