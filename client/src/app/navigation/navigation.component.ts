import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserAuth } from '../models/user';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  currentUser: UserAuth | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.restoreAuthState().subscribe((res) => {
      this.currentUser = res;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logoutUser().subscribe((res) => {
      console.log(res);
      this.currentUser = null;
      this.router.navigate(['']);
    });
  }
}
