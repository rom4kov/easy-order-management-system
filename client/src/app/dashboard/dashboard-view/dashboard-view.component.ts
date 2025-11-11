import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet, LoadingComponent],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent {

}
