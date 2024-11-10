import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [      
    provideHttpClient(), 
    // cung cấp router và binding input cho component
    provideRouter(routes, withComponentInputBinding(), 
    // cung cap tham so duong dan cho cac router con
    withRouterConfig({
      paramsInheritanceStrategy: 'always'
    })),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
};
