import { Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef } from "@angular/core";
import { fadeIn, slideInBottom, slideInLeft } from "src/app/modules/shared/animations";
import { TripPlanPopupComponent } from '../trip-plan-popup/trip-plan-popup.component';

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

  constructor(private cdr: ChangeDetectorRef) {}
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
}
