import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';

import { TourApiService } from "../../../services/tour-api/tour-api.service";

@Component({
  selector: 'app-tours-listing',
  templateUrl: './tours-listing.component.html',
  styles:[ `
    .active {
      background-color: #007bff;
      color: white;
    }
  `]
})

export class ToursListingComponent implements OnInit{
  tours$= this.tourApiService.tours$
  currentPage: number = 1
  totalPages = 1
  searchText!: string 
  
  constructor(private tourApiService: TourApiService) {}

  ngOnInit(): void {
    // load tour function
    this.loadItems()
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

  loadItems () {
    this.tourApiService.getTours(this.currentPage, this.searchText).subscribe({
      next: (data) => {
          this.currentPage = data.currentPage    
          this.totalPages = data.totalPages  
      },
      error: (error) => {
          console.log(error)
      }
  })
  }

  deleteTour(id:string) {
    this.tourApiService.deleteTour(id).subscribe()
  }

  // Page changing function
  changePage(page: number): void {
    if(page >=1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadItems()
    }
  }

  getPageNumbers(): number[] {
      const pages: number[] = [];

      for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
      }

      return pages
  }
  
  onSearch() {
    if(this.searchText) {
      this.loadItems()
    }
  }
}