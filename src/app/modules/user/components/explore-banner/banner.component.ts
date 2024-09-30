import { ChangeDetectorRef, Component } from "@angular/core";
import { fadeIn, slideInBottom } from "src/app/modules/shared/animations";

@Component({
    selector : "app-explore-banner",
    templateUrl : "./banner.component.html",
    animations : [
        fadeIn, slideInBottom
    ]
})
export class ExploreBannerComponent {
    constructor(private cdr: ChangeDetectorRef) {}
    fadeView: boolean = false
    slideView: boolean = false

    onFadeView(): void {
        this.fadeView = true
        this.cdr.detectChanges()
    }

    onSlideView(): void {
        this.slideView = true
        this.cdr.detectChanges()
    }
}