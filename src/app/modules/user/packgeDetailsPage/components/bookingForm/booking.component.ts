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
  successMsg!: string

  constructor(
    private fb: FormBuilder, 
    private bookService: BookingService,
    private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.tourDetails$.subscribe(detials => {
      this.tourDetails = detials
    })

    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      tickets: [0, Validators.required],
      tourId:[this.tourDetails._id, Validators.required]
    })  
  }

  onSubmit() {
    
    if(this.bookingForm.valid){
      this.bookService.bookTour(this.bookingForm.value).subscribe(
        res => {
          this.successMsg = res.message
          this.bookingForm.reset()
          setTimeout(() => {
            this.successMsg = ''
          }, 3000);
        },
        error => {
          console.log(error);
        }
      )
    }    
  }
}