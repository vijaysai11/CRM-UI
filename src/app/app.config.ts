import { ApplicationConfig } from '@angular/core';
import { EmailService } from './email-service.service';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),
    EmailService
   ],
   
};
