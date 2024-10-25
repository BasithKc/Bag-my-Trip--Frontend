import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})

export class GalleryComponent implements OnInit{
  tourDetails: any

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.tourDetails$.subscribe(details => {
      this.tourDetails = details.gallery
    })
  }
}