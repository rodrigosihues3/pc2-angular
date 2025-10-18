import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BoletaService } from '../../../services/boleta/boleta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-boleta',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
],
  templateUrl: './detalle-boleta.component.html',
  styleUrl: './detalle-boleta.component.css'
})
export class DetalleBoletaComponent {
  boleta: any = null; // Variable para guardar los datos de la boleta
  cargando = true;
  error = '';

  // Totales que calcularemos
  subtotal = 0;
  igv = 0;
  total = 0;

  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private boletaService: BoletaService
  ) { }

  ngOnInit(): void {
    // 1. Leemos el parámetro 'id' de la URL
    const boletaId = this.route.snapshot.paramMap.get('id');

    if (boletaId) {
      // 2. Si hay un ID, llamamos al servicio para obtener los datos
      this.boletaService.getBoletaById(boletaId).subscribe({
        next: (data) => {
          this.boleta = data;
          this.calcularTotales(); // Calculamos los totales una vez que tenemos los datos
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'No se pudo encontrar la boleta solicitada.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'No se proporcionó un ID de boleta.';
      this.cargando = false;
    }
  }

  calcularTotales(): void {
    if (this.boleta && this.boleta.detalle) {
      // Usamos reduce para sumar el (cantidad * precio) de cada item
      this.total = this.boleta.detalle.reduce((acc: number, item: any) => acc + (item.cantidad * item.precioUnitario), 0);
      // Asumimos un IGV del 18% para el cálculo
      this.subtotal = this.total / 1.18;
      this.igv = this.total - this.subtotal;
    }
  }
}
