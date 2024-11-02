import { Component, OnInit } from "@angular/core";
import { TourApiService } from "../../../services/tour-api/tour-api.service";

@Component({
  selector: 'app-tour-bookings',
  templateUrl: 'bookings.component.html'
})

export class TourBookingsComponent implements OnInit{
  tourBookings: any = []

  constructor (private tourApiService: TourApiService) {}

  ngOnInit(): void {
    this.tourApiService.getTourBookings().subscribe(
      res => {
        this.tourBookings = res.bookings  
      },
      err => {
        console.log(err); 
      }
    )
  }
}