import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";

@Component({
    selector : "package-card",
    templateUrl : "./packageCard.component.html",
    styleUrls : ["./packageCard.component.css"]
})
export class PackageCardComponent implements OnInit{
    packageList = [
        { img : "/assets/images/package/pic-1.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "₹ 1,100", rating : "5" },
        { img : "/assets/images/package/pic-2.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "₹ 1,100", rating : "5" },
        { img : "/assets/images/package/pic-3.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "$ 1,100", rating : "5" },
        { img : "/assets/images/package/pic-4.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "$ 1,100", rating : "5" },
        { img : "/assets/images/package/pic-5.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "$ 1,100", rating : "5" },
        { img : "/assets/images/package/pic-6.png", heading : "Switzweland", description : "Qui tempore voluptate qui quia commodi rem praesentium alias et.", date : "12 Sep ", strength : "120+ people", cost : "$ 1,100", rating : "5" },

    ]
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