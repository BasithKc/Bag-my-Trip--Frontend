import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TripPlanPopupComponent } from '../trip-plan-popup/trip-plan-popup.component';
import { fadeIn, slideInBottom, slideInLeft } from 'src/app/modules/shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations : [
    fadeIn, slideInLeft, slideInBottom
  ]
})
export class HomeComponent {
 @ViewChild(TripPlanPopupComponent) tripPlanPopup!: TripPlanPopupComponent
  constructor(private cdr: ChangeDetectorRef) {}
  iconView = false
  headView = false
  imgView = false
  bannerView = false
  mainBannerView = false

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

  onIcon(): void {
    this.iconView = true
    this.cdr.detectChanges()
  }
  
  onHead(): void {
    this.headView = true
    this.cdr.detectChanges()
  }

  onImage(): void {
    this.imgView = true
    this.cdr.detectChanges()
  }

  onBanner(): void {
    this.bannerView = true
    this.cdr.detectChanges()
  }

  onMainBanner(): void {
    this.mainBannerView = true
    this.cdr.detectChanges()
  }
}
