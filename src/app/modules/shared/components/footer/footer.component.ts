import { ChangeDetectorRef, Component } from '@angular/core';
import { fadeIn, slideInBottom, slideInLeft } from '../../animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  logoView = false
  liIcons = false
  subscription = false

  onlogoView():void {
    this.logoView = true
    console.log(this.logoView);
    
    this.cdr.detectChanges()
  }

  onLiIconsView():void {
    this.liIcons = true
    this.cdr.detectChanges()
  }

  onSubscriptionView():void {
    this.subscription = true
    this.cdr.detectChanges()
  }
}
