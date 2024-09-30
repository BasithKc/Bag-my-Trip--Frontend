import { ChangeDetectorRef, Component } from '@angular/core';
import { slideInBottom } from '../../animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    slideInBottom
  ]
})
export class FooterComponent {
}
