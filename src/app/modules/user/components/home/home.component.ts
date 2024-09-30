import { Component, ViewChild } from '@angular/core';
import { TripPlanPopupComponent } from '../trip-plan-popup/trip-plan-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 @ViewChild(TripPlanPopupComponent) tripPlanPopup!: TripPlanPopupComponent

  //  Whatsapp message configuration
  phoneNumber = '9746411628'
  message = 'Hello, Tell me about your services'
 
 openTripPlanPopup  () {
  this.tripPlanPopup.openPopup()
 }

 onPlanSelected(plan: {type: string, budget: number[]}) {
  console.log('selected plain', plan);
  }

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank')
  }
}
