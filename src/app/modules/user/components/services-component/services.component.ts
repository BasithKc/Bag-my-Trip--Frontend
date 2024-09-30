import { ChangeDetectorRef, Component } from "@angular/core";
import { slideInBottom } from "src/app/modules/shared/animations";

@Component({
    selector : "app-services",
    templateUrl : "./services.component.html",
    animations : [
        slideInBottom
    ]
})
export class ServicesComponent {
    constructor(private cdr: ChangeDetectorRef) {}
    cardVisibility: Array<boolean> = [] 

    serviceList = [
        {
            image : "/assets/images/services/tour-guide.png",
            heading : "Guided Tours",
            body : "Expert guidance for unforgettable trips. Discover hidden gems with our knowledgeable guides. Let us curate the perfect journey for you."
        },
        {
            image : "/assets/images/services/flight.png",
            heading : "Best Flight Options",
            body : "Seamless flight bookings at your fingertips. Find the best deals on flights. Book now and secure your dream vacation."
        },
        {
            image : "/assets/images/services/resort.png",
            heading : "Resort Bookings",
            body : "Discover your perfect getaway with our resort booking service. Find your dream vacation spot and book your stay today."
        },
        {
            image : "/assets/images/services/hands.png",
            heading : "Religious Tours",
            body : "Immerse yourself in sacred traditions. Tailored religious tours to match your beliefs. Experience the spiritual beauty of the world."
        },
        {
            image : "/assets/images/services/medical_team.png",
            heading : "Medical Insurance",
            body : "Travel with confidence and peace of mind. Comprehensive medical coverage for any emergency. Easy claims process and 24/7 assistance."
        },
    ]

    onCardInView(index: number, isVisible: boolean): void {
        this.cardVisibility[index] = isVisible
        this.cdr.detectChanges()  // Trigger change detection
    }
}