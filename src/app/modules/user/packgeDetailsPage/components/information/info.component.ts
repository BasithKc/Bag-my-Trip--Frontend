import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styles: [`
    @media (max-width: 640px) {
      .border-spacing-y-4 {
        border-spacing-y: 1rem;
      }
    }
  `]
})

export class InfoComponent implements OnInit{
  tourDetails : any

  constructor(private tourService: TourService){}

  ngOnInit(): void {
    this.tourService.tourDetails$.subscribe(details => {
      this.tourDetails = details      
    })
  }
}