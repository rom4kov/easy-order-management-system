import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { LoadingService } from './loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable, tap } from 'rxjs';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe, NgTemplateOutlet],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit {
  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          }),
        )
        .subscribe();
    }
  }
}
