import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent {
  constructor(private router: Router) {}

  goToAuthForm(event: MouseEvent) {
    console.log(event);
    const target =
      (event.target as HTMLButtonElement).parentElement?.textContent ===
      ' Sign-In '
        ? '/auth/login'
        : '/auth/register';
    console.log(target);
    this.router.navigate([target]);
  }
}
