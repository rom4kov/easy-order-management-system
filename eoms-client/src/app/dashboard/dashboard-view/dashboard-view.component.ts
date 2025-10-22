import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent {

}
