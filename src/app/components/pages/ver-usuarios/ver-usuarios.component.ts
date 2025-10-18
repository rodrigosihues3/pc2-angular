import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent {
  usuarios: any[] = [];

  constructor(private aythService: AuthService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.aythService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados: ', this.usuarios);
      },
      error: (error) => {
        console.error('Error al cargar los usuarios: ', error);
      }
    });
  }
}
