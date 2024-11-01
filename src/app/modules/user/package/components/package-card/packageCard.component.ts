import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";

@Component({
    selector : "package-card",
    templateUrl : "./packageCard.component.html",
    styleUrls : ["./packageCard.component.css"]
})
export class PackageCardComponent implements OnInit{
    tours: any [] = []

    constructor(private tourService: TourService) {}

    ngOnInit(): void {
        this.tourService.getAllTours().subscribe(
            res => {
                this.tours = res.tours                
            }
        )
    }
}