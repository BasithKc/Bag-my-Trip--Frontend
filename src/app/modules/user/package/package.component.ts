import { Component } from "@angular/core";

@Component({
    selector : "app-package-page",
    templateUrl : "./package.component.html"
})
export class PackageComponent {
    sortList = [
        { element : "Date", icon : "fa-regular fa-calendar" },
        { element : "Price Low To High", icon : "fa-solid fa-arrow-up" },
        { element : "Price Hight To Low", icon : "fa-solid fa-arrow-down" },
        { element : "Name (A-Z)", icon : "fa-solid fa-arrow-down-a-z" },
    ]

    selectedList = 0;
    isDropdownVisible = false;
    buttonText = "Book Now"

    onOptionChange(index: number, mobile: boolean) {
        if ( mobile ) {
            this.toggleDropdown()
            this.selectedList = index
        }
        this.selectedList = index
    }

    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
        if ( this.buttonText === "Book Now" ) {
            this.buttonText = "Cancel"
        } else if ( this.buttonText === "Cancel" ) {
            this.buttonText = "Book Now"
        }
    }
}