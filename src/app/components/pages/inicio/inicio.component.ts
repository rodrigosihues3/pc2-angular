import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
// Decorador que define la configuración del componente
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './inicio.component.html', //Archivo HTML
  styleUrl: './inicio.component.css' //Archivo CSS
})
export class InicioComponent {
  // Inyectamos el servicio de autenticacion para acceder al estado del usuario
  constructor(public authService: AuthService) { }
}
