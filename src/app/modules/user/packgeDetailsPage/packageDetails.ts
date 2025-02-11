import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {  ActivatedRoute, Router } from "@angular/router";
import { TourService } from "../services/tour.service";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-package-details',
  templateUrl: './packageDetails.html',
  styleUrls: ["./packageDetails.css"]
})

export class PackageDetails implements OnInit{
  @ViewChild('bookingForm', { read: ElementRef }) bookingForm!: ElementRef;
  tourId: any
  tourDetails: any

  constructor(
    private router: Router,
    private tourService: TourService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) { }
  

  currentIndex = 0; // Tracks the active header item

  ngOnInit(): void {
     // Get data from resolver
     this.route.data.subscribe(data => {
      this.tourId = data['tourDetials']._id;  
    });

    this.tourService.tourDetails$.subscribe(details => {
      this.tourDetails = details      
    })

    this.setMetaTags(this.tourDetails)
  }


  onHeaderItemClick(clickedIndex: number) {
      this.currentIndex =clickedIndex;
  }

  scrollToBookingForm() {
    if (this.bookingForm && this.bookingForm.nativeElement) {
      this.bookingForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isActive(route: string) {
    return this.router.url === route
  }

  setMetaTags(tour: any) {
    this.title.setTitle(`${tour.title} - ${tour.location} Tour | Bag My Trip`);

      // Remove existing tags
      this.meta.removeTag('name="description"');
      this.meta.removeTag('name="keywords"')
      const metaTags = [
        {name: 'descrption' ,content: tour.description },
        {name: 'keywords', content: 'travel, tourism, vacation, holiday, trip, tour guide,train booking,  visa service,  hotel booking,  bus booking'}, 
      ]
      
      this.addStructuredData(tour)
      
      metaTags.forEach(tag => {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      });

  }
  private addStructuredData(tour: any) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.name,
      description: tour.description,
      touristType: ['Leisure Travel', 'Package Tour'],
      image: tour.imageUrl,
      url: `${window.location.origin}/tours/${tour._id}`,
      provider: {
        '@type': 'Organization',
        name: 'Bag My Trip',
        url: window.location.origin
      },
      offers: {
        '@type': 'Offer',
        price: tour.pricePerperson,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock'
      },
      itinerary: tour.itinerary.map((day: any) => ({
        '@type': 'TouristAttraction',
        name: day.title,
        description: day.description
      }))
    };

     // Add structured data script tag
     const script = document.createElement('script');
     script.type = 'application/ld+json';
     script.text = JSON.stringify(structuredData);
     document.head.appendChild(script);
  }

  ngOnDestroy() {
    // Clean up structured data when component is destroyed
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }
}