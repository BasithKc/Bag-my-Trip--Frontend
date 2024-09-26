import { Component, ViewChild } from '@angular/core';
import { TripPlanPopupComponent } from '../trip-plan-popup/trip-plan-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 @ViewChild(TripPlanPopupComponent) tripPlanPopup!: TripPlanPopupComponent
 
 openTripPlanPopup  () {
  this.tripPlanPopup.openPopup()
 }

 onPlanSelected(plan: {type: string, budget: number[]}) {
  console.log('selected plain', plan);
  
 }
}
