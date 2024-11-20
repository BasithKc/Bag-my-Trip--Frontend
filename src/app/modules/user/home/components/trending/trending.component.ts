import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TourService } from '../../../services/tour.service';
import { register } from 'swiper/element/bundle';
import { slideInBottom } from "src/app/modules/shared/animations";


register()
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  animations : [
    slideInBottom
  ],
})
export class TrendingComponent implements OnInit{
   tourService = inject(TourService)
   cdr = inject(ChangeDetectorRef)
   cardVisibility: Array<boolean> = [] 

   tours: any[] = []

   breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

   ngOnInit():void {
    this.tourService.getTrendingTrips().subscribe(
      res => {
        this.tours = res.tours        
      }
    )
   }

    ngAfterViewInit() {
    // Initialize Swiper
    const swiperEl: any = document.querySelector('swiper-container');
    
    // Swiper parameters
    const swiperParams = {
      slidesPerView: 1,
      pagination: true,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      loop: true,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      },
    };

    // Assign Swiper parameters
    Object.assign(swiperEl, swiperParams);

    // Initialize Swiper
    swiperEl.initialize();
  }

  onCardInView(index: number, isVisible: any): void {
    this.cardVisibility[index] = isVisible
    this.cdr.detectChanges()  // Trigger change detection
}
}
