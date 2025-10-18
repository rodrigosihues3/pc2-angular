import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Habilita el enrutamiento de Angular y carga las rutas definidas en el archivo app.routes.ts
    provideRouter(routes),
    //
    provideHttpClient()
  ]
};
