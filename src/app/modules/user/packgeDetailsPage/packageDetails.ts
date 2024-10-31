import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {  ActivatedRoute, Router } from "@angular/router";
import { TourService } from "../services/tour.service";

@Component({
  selector: 'app-package-details',
  templateUrl: './packageDetails.html',
  styleUrls: ["./packageDetails.css"]
})

export class PackageDetails implements OnInit{
  @ViewChild('bookingForm', { read: ElementRef }) bookingForm!: ElementRef;
  tourId: any

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  

  currentIndex = 0; // Tracks the active header item

  ngOnInit(): void {
     // Get data from resolver
     this.route.data.subscribe(data => {
      this.tourId = data['tourDetials']._id;      
    });
  }


  onHeaderItemClick(clickedIndex: number) {
      this.currentIndex =clickedIndex;
  }

  scrollToBookingForm() {
    if (this.bookingForm && this.bookingForm.nativeElement) {
      this.bookingForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isActive(route: string) {
    return this.router.url === route
  }

}