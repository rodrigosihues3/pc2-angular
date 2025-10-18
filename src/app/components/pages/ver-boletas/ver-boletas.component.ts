import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoletaService } from '../../../services/boleta/boleta.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-ver-boletas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-boletas.component.html',
  styleUrl: './ver-boletas.component.css'
})
export class VerBoletasComponent {
  boletas: any[] = [];
  // Agregamos una variable para manejar el estado de carga
  cargando = true;

  constructor(private boletaService: BoletaService) { }

  ngOnInit(): void {
    this.boletaService.getBoletas().subscribe({
      next: (data) => {
        this.boletas = data;
        this.cargando = false; // Dejamos de cargar cuando llegan los datos
      },
      error: (err) => {
        console.error('Error al cargar las boletas:', err);
        this.cargando = false; // Dejamos de cargar también si hay un error
      }
    });
  }

  // Función para calcular el total de una boleta (lo usaremos en el HTML)
  calcularTotal(detalle: any[]): number {
    return detalle.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  }
}
