import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';

import { TourApiService } from "../../../services/tour-api/tour-api.service";

@Component({
  selector: 'app-tours-listing',
  templateUrl: './tours-listing.component.html',
})

export class ToursListingComponent implements OnInit{
  tours$= this.tourApiService.tours$
  
  constructor(private tourApiService: TourApiService) {}

  ngOnInit(): void {
    this.tourApiService.getTours().subscribe()
  }

  confirmDelete(id:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        this.deleteTour(id);
      }
    });
  }

  deleteTour(id:string) {
    this.tourApiService.deleteTour(id).subscribe()
  }
}