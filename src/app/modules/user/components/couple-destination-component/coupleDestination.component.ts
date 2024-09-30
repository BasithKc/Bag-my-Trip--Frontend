import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component } from "@angular/core";
import { fadeIn, slideInBottom, slideInLeft } from "src/app/modules/shared/animations";

@Component({
    selector : "app-couple-destination",
    templateUrl : "./coupleDestination.component.html",
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
export class CoupleDestinationComponent {
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