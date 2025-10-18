import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CommonModule } from '@angular/common';

// Nuestro componente raiz de angular
// Aqui se agrupa la barra de navegacion, el area central segun la ruta
// y el pie de pagina
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, // Habilita el enrutamiento entro del componente
    NavbarComponent, // componente del encabezado de la aplicación
    FooterComponent // compoente del pie de pagina
  ],
  templateUrl: './app.component.html', // Ruta al archivo html
  styleUrl: './app.component.css' //ruta al archivo css
})
export class AppComponent {
  title = 'boleteando';
}
