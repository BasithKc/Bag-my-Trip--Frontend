import { Component } from "@angular/core";
import { SidebarService } from "./services/sidebar/sidebar-service.";


@Component({
  selector: 'app-admin',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent {
  isShowMenu = false

  constructor(private sidebarService: SidebarService) {
    sidebarService.isOpen$.subscribe(isOpen => {      
      console.log(this.isShowMenu);
      
        this.isShowMenu = isOpen
    })
  }
}