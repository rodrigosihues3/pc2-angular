import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';

// Le decimos a TypeScript que la variable 'bootstrap' existe a nivel global (gracias al script que añadimos)
declare var bootstrap: any;

//Decorador que define el compoente navbar
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html', // archivo que contien la estructura HTML
  styleUrl: './navbar.component.css' //archivo que contiene el CSS
})
export class NavbarComponent {
  constructor(public authService: AuthService) { }

  // Usamos @ViewChild para "agarrar" el elemento del HTML que tiene la variable #confirmLogoutModal
  @ViewChild('confirmLogoutModal') modalElement!: ElementRef;

  private modalInstance: any;

  // Este método se ejecuta después de que la vista del componente ha sido inicializada
  ngAfterViewInit(): void {
    // Creamos la instancia del modal de Bootstrap para poder controlarla con código
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // Método para abrir el modal
  openModal(): void {
    this.modalInstance.show();
  }

  // Método que se ejecuta cuando el usuario confirma en el modal
  ejecutarLogout(): void {
    this.modalInstance.hide(); // Primero, cerramos el modal
    this.authService.logout(); // Luego, ejecutamos el cierre de sesión
  }
}
