import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookingService } from "../../../services/booking.service";
import { TourService } from "../../../services/tour.service";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking.component.html'
})

export class BookingComponent implements OnInit{
  bookingForm!: FormGroup 
  tourDetails: any

  constructor(
    private fb: FormBuilder, 
    private bookService: BookingService,
    private tourService: TourService) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      tickets: [0, Validators.required],
      tourId:[this.tourDetails._id, Validators.required]
    })
    this.tourService.tourDetails$.subscribe(detials => {
      this.tourDetails = detials
    })
    
  }

  onSubmit() {
    console.log(this.bookingForm.value);
    
    if(this.bookingForm.valid){
      this.bookService.bookTour(this.bookingForm.value).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      )
    }    
  }
}