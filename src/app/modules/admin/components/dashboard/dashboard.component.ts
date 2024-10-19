import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
})

export class DashboardComponent {
  chartOptions = {
    title:{
      text: "Tour Bookings"  
    },
    animationEnabled: true,
    data: [{        
      type: "column",
      dataPoints: [
        { label: 'Jan', y: 71 },
        { label: 'Feb', y: 55 },
        { label: 'Mar', y: 50 },
        { label: 'Apr', y: 65 },
        { label: 'May', y: 95 },
        { label: 'June', y: 68 },
        { label: 'July', y: 28 },
        { label: 'Aug', y: 34 },
        { label: 'sep', y: 14 }
      ]
    }]
  }	
}