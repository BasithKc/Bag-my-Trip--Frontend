import { Component, OnInit } from "@angular/core";
import { TourApiService } from "../../../services/tour-api/tour-api.service";

@Component({
  selector: 'app-tours-listing',
  templateUrl: './tours-listing.component.html',
})

export class ToursListingComponent implements OnInit{
  tours: any = [];
  constructor(private tourApiService: TourApiService) {}

  ngOnInit(): void {
    this.tourApiService.getTours().subscribe((response: any) => {
      this.tours = response.tours
      console.log(this.tours);
      
    })
  }
}