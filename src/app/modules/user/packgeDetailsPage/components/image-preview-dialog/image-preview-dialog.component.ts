import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-image-preview-dialog',
  templateUrl: './image-preview-dialog.component.html',
  styleUrls: ['./image-preview-dialog.component.css']
})
export class ImagePreviewDialogComponent {
  images: string[];
  currentIndex: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {images: string[], initialIndex: number},
    private dialogRef: MatDialogRef<ImagePreviewDialogComponent>
  ) {
    this.images = data.images;
    this.currentIndex = data.initialIndex
  }

  close(): void {
    this.dialogRef.close();
  }

  previous(): void {
    if(this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() : void {
    if(this.currentIndex < this.images.length -1) {
      this.currentIndex++;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }
}
