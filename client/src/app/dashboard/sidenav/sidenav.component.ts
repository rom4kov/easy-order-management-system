import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  activeRoute: string = "";
  value: string = "";

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute = this.router.url;
    console.log(this.activeRoute);
  }

  updateActiveRoute(): string {
    return this.router.url.split("/")[2]
  }
}
