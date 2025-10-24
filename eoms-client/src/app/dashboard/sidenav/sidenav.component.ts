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
    // const span = (event.target as HTMLSpanElement);
    // if (this.router.url.includes((span.parentElement as HTMLButtonElement).value)) {
    //   span.style.backgroundColor = 'white';
    //   span.style.color = '#9fa8da';
    // } else {
    //   span.style.backgroundColor = '#9fa8da';
    //   span.style.color = 'white';
    // }
    return this.router.url.split("/")[2]
  }
}
