import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector : "package-card",
    templateUrl : "./packageCard.component.html",
    styleUrls : ["./packageCard.component.css"]
})
export class PackageCardComponent implements OnInit{
    tours: any [] = []
    currentPage: number = 1
    totalPages = 1

    constructor(
        private tourService: TourService, 
        private route: ActivatedRoute, 
        private title: Title, 
        private meta: Meta,
        private router: Router
     ) {}

    ngOnInit(): void {
        this.loadItems()
        this.setMetaTags()
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

    private setMetaTags() {
        // Set the page title
        this.title.setTitle('Tour Listings | Bag My Trip');
    
        // Remove any existing meta tags
        this.meta.removeTag('name="description"');
        this.meta.removeTag('name="keywords"');
        this.meta.removeTag('property="og:title"');
        this.meta.removeTag('property="og:description"');
        this.meta.removeTag('property="og:url"');
        this.meta.removeTag('property="og:image"');
    
        // Add new meta tags
        const metaTags = [
          { name: 'description', content: 'Explore our curated collection of amazing tours and travel experiences. Find your perfect adventure with Bag My Trip.' },
          { name: 'keywords', content: 'tours, travel, adventures, trips, holiday packages, travel experiences' },
          { property: 'og:title', content: 'Tour Listings | Bag My Trip' },
          { property: 'og:description', content: 'Discover and book incredible tours and travel experiences with Bag My Trip.' },
          { property: 'og:url', content: `${window.location.origin}${this.router.url}` },
          { property: 'og:image', content: 'https://bagmytrip.in/assets/images/bag my trip logo new.png' }
        ];
    
        metaTags.forEach(tag => {
          if (tag.name) {
            this.meta.updateTag({ name: tag.name, content: tag.content });
          } else if (tag.property) {
            this.meta.updateTag({ property: tag.property, content: tag.content });
          }
        });

    }
}