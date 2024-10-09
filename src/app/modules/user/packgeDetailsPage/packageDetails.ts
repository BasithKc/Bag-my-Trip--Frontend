import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-package-details',
  templateUrl: './packageDetails.html',
  styleUrls: ["./packageDetails.css"]
})

export class PackageDetails {
  @ViewChild('bookingForm', { read: ElementRef }) bookingForm!: ElementRef;

  constructor(private router: Router) {}

  currentIndex = 0; // Tracks the active header item

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