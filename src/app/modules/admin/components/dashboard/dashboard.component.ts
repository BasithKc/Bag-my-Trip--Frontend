import { Component } from "@angular/core";
import { SidebarService } from "../../services/sidebar/sidebar-service.";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {
  isShowMenu = false

  constructor(private sidebarService: SidebarService) {
    sidebarService.isOpen$.subscribe(isOpen => {
      console.log(isOpen);
      
        this.isShowMenu = isOpen
    })
  }
}