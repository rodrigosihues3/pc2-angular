import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent {
  productos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
      }
    });
  }
}
