import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

// Decorador que define el componente y su configuración
@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent {
  // Arreglo que almacenará los usuarios obtenidos desde el backend
  usuarios: any[] = [];

  constructor(private aythService: AuthService) { }
  // Método que se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit(): void {
    this.cargarUsuario();
  }
 // Método encargado de obtener la lista de usuarios desde el servicio
  cargarUsuario(): void {
    this.aythService.getUsuarios().subscribe({
      next: (data) => {
          // Si la petición es exitosa, almacena los datos recibidos en el arreglo 
        this.usuarios = data;
        console.log('Usuarios cargados: ', this.usuarios);
      },
      error: (error) => {
          // Si ocurre un error, lo muestra en la consola
        console.error('Error al cargar los usuarios: ', error);
      }
    });
  }
}
