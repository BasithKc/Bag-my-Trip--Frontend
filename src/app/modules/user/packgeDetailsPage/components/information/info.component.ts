import { Component, OnInit } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { MatDialog } from "@angular/material/dialog";
import { ImagePreviewDialogComponent } from "../image-preview-dialog/image-preview-dialog.component";

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

  constructor(private tourService: TourService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.tourService.tourDetails$.subscribe(details => {
      this.tourDetails = details   
    })
  }
  openImagePreview(index: number) {
    this.dialog.open(ImagePreviewDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'image-preview-dialog-container',
      data: {
        images: this.tourDetails.gallery,
        initialIndex: index
      }
    })
  }
}