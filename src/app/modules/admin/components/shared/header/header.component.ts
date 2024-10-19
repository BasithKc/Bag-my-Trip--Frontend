import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarService } from "../../../services/sidebar/sidebar-service.";

@Component({
  selector: 'app-admin-header',
  templateUrl : './header.component.html',
  styleUrls: ['./header.component.css']
})

export class AdminHeaderComponent implements OnInit{
  @ViewChild('menuDiv') menuDiv!: ElementRef;
  @ViewChild('menuBtn') menuBtn!: ElementRef

  @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = window.innerWidth;
      if (this.isMobileView()) {
        this.isShowMenu = false;
        this.sidebarService.closeSidebar()
      }
    }

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
      if (this.isMobileView() && this.isShowMenu) {
        if (!this.menuDiv.nativeElement.contains(event.target as Node) && !this.menuBtn.nativeElement.contains(event.target as Node)) {
          this.isShowMenu = false;
          this.sidebarService.closeSidebar()
        }
      }
    }
    screenWidth!: number;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

 
  constructor(private router: Router, private sidebarService: SidebarService) {}

  isTourClicked:boolean = false
  isShowMenu:boolean = false
  showHome:boolean=false

  // Checking active for menus
  isActive(route:string) {
    return this.router.url === route
  }


  isIncludeActive(route: string) {
    return this.router.url.includes(route)
  }

  // Checking for active class in the sub menus of Tour
  isToursActive(route:string) {
    return this.router.url===route
  }

  // Function for showing sub menus of tour
  showTourSub():void {
    this.isTourClicked = true
  }

  // Function for showing menu items for smaller screen
  showMenu ():void {
    this.isShowMenu = !this.isShowMenu
    this.sidebarService.toggleSidebar(this.isShowMenu)
  }

  isMobileView(): boolean {
    return window.innerWidth < 768; // Now correctly returns true for mobile views
  }

  onMouseEnter() {
    if (this.screenWidth >= 768 && this.screenWidth < 1024) {
      this.isTourClicked = !this.isTourClicked;
    }
  }

}