import { Component } from "@angular/core";

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

export class InfoComponent {}