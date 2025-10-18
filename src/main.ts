import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//Inici la aplicacion Angular usnado el componente raiz
// si ocurre un error durante el arranque, lo muestra en la consola
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
