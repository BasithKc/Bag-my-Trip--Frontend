import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { fadeIn, slideInLeft } from "../../shared/animations";


@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  animations : [
    fadeIn, slideInLeft
]
})

export class AboutComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  imgAnimation: boolean = false
  textAnimation: boolean = false

  onImgView(): void {
    this.imgAnimation = true
    this.cdr.detectChanges()
  }


  onTextView(): void {
      this.textAnimation = true
      this.cdr.detectChanges()
  }

  // Slides for smaller screens
  slides: string[] = [
    '/assets/images/honeymoon/kashmir-2.jpg',
    '/assets/images/honeymoon/kashmir-3.jpg',
    '/assets/images/honeymoon/kashmir-5.webp'
  ];

  intPackages = [
    {
      img: "/assets/images/about/thailand.jpg",
      body: "Thailand"
    },
    {
      img: "/assets/images/about/malaysia.jpg",
      body: "Malaysia"
    },
    {
      img: "/assets/images/about/azarbaijan.webp",
      body: "Azarbaijan"
    },
    {
      img: "/assets/images/about/Bali.jpg",
      body: "Bali"
    }
  ]

  currentSlide: number = 0;

  ngOnInit(): void {
    this.autoSlide();
  }

  autoSlide(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Change image every 3 seconds
  }
}