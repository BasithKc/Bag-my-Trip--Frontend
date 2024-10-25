import { Injectable } from "@angular/core";
import { TourService } from "./tour.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class TourDetailsResolver implements Resolve<any>{
  constructor(private tourService: TourService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tourId = route.paramMap.get('tourId')    
    this.tourService.getTourDetails(tourId).subscribe()
  }
}