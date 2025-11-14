import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserAuth } from '../models/user';
import { catchError, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  currentUser: UserAuth | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.restoreAuthState().pipe(
      catchError((err: unknown) => {
        console.error(err);
        this.router.navigate(['']);
        return throwError(() => {
          console.log("error:", err);
        });
      })
    ).subscribe(res => {
        console.log("res:", res);
        catchError((err: unknown) => {
          console.log("error catched", err);
          return throwError(() => {
            console.error("error:", err);
          });
        })
      })
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
