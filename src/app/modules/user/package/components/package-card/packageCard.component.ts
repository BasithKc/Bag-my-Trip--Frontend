import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { ActivatedRoute, Route } from "@angular/router";

@Component({
    selector : "package-card",
    templateUrl : "./packageCard.component.html",
    styleUrls : ["./packageCard.component.css"]
})
export class PackageCardComponent implements OnInit{
    tours: any [] = []

    constructor(private tourService: TourService, private route: ActivatedRoute) {}

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            const {destination, tripType} = params
            if( destination || tripType ) {
                this.tourService.getFilteredTrips(destination, tripType).subscribe({
                    next: (data) => {
                        this.tours= data.tours
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
            } else {
                this.tourService.getAllTours().subscribe(
                    res => {
                        this.tours = res.tours                
                    }
                )
            }
        })
        
    }
}