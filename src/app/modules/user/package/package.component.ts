import { Component } from "@angular/core";

@Component({
    selector : "app-package-page",
    templateUrl : "./package.component.html",
})
export class PackageComponent {
    sortList = [
        { element : "Date", icon : "fa-regular fa-calendar" },
        { element : "Price Low To High", icon : "fa-solid fa-arrow-up" },
        { element : "Price High To Low", icon : "fa-solid fa-arrow-down" },
        { element : "Name (A-Z)", icon : "fa-solid fa-arrow-down-a-z" },
    ]

    selectedList = 0;


}