import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef } from "@angular/core";
import { fadeIn,slideInLeft } from "src/app/modules/shared/animations";
import { TripPlanPopupComponent } from './components/trip-plan-popup/trip-plan-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations : [
    fadeIn, slideInLeft, 
    trigger("slideInBottom", [
        state("hidden", style({
            opacity : 0.4,
            transform: 'translateY(35px) rotate(-90deg) scale(.97)'
        })),
        state("visible", style({
            opacity : 1,
            transform : '*'
        })),
        transition("hidden => visible", [
            animate("1s 2s ease-out")
        ])
    ]),
]
})
export class HomeComponent{
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

 onPlanSelected(plan: {type: string, budget: string}) {
  console.log('selected plain', plan);
  }

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank')
  }

    textAnimation: boolean = false
    imgAnimation: boolean = false

    onTextView(): void {
        this.textAnimation = true
        this.cdr.detectChanges()
    }

    onImgView(): void {
        this.imgAnimation = true
        this.cdr.detectChanges()
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
