import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

//Decorador que define las propiedades del componente
@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './iniciar-sesion.component.html', //archivo HTML
  styleUrl: './iniciar-sesion.component.css' //archivo CSS 
})
export class IniciarSesionComponent {
  //Propiedades enlazadas con el formulario
  email = ''; //Guarda el correo ingresado por el usuario
  password = ''; //Guarda la contraseña ingresada
  error = ''; //Muestra mensajes de error si el login falla

  //Inyectacion de dependencias: servicio de autenticacion y enrutador
  constructor(private authService: AuthService, private router: Router) { }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit(): void {
    //Llama al metodo login del servisio de autenticacion
    //pasando el email y contraseña
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        //si los datos son los correctos, nos redirige al inicio
        this.router.navigate(['/']);
      } else {
        //si falla, muestra mensaje de error
        this.error = 'Email o contraseña incorrectos.';
      }
    });
  }
}
