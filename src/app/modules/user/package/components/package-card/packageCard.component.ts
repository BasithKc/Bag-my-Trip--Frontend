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
    currentPage: number = 1
    totalPages = 1

    constructor(private tourService: TourService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadItems()
    }

    loadItems () {
        this.route.queryParams.subscribe(params => {
            const {destination, tripType} = params
            if( destination || tripType ) {
                this.tourService.getFilteredTrips(destination, tripType).subscribe({
                    next: (data) => {
                        this.tours= data.tours
                        this.currentPage = data.currentPage    
                        this.totalPages = data.totalPages  
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
            } else {
                this.tourService.getAllTours(this.currentPage).subscribe(
                    res => {
                        this.tours = res.tours    
                        this.currentPage = res.currentPage    
                        this.totalPages = res.totalPages        
                    }
                )
            }
        })
    }

    changePage(page: number): void {
        if(page >=1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadItems()
        }
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];

        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }

        return pages
    }
}