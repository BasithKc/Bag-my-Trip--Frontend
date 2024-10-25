import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";

@Component({
  selector: 'app-tour-plan',
  templateUrl: './tour-plan-component.html',
})

export class TourPlanComponent implements OnInit{
  tourDetails: any

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.tourDetails$.subscribe(details => {
      this.tourDetails = details
      console.log(this.tourDetails);
      
    })
  }
}