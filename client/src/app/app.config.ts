import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorProvider } from './interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(AngularSvgIconModule.forRoot()),
    authInterceptorProvider,
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
