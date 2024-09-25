import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('menuAnimation', [
      state('open', style({ opacity: 1, transform: 'translateY(0)' })),
      state('closed', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent {
  isMenuOpen: boolean = false

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen    
  }
}
