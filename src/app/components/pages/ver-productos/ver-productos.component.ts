import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto/producto.service';
import { CommonModule } from '@angular/common';

// Decorador que define las propiedades del componente
@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent {
   // Arreglo que almacenará los productos obtenidos del servicio
  productos: any[] = [];
   // Inyección del servicio de productos en el constructor
  constructor(private productoService: ProductoService) { }
 // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
     // Llama al servicio para obtener los productos al cargar el componente
    this.productoService.getProductos().subscribe({
         // En caso de éxito, guarda los datos en el arreglo "productos"
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
       // En caso de error, muestra un mensaje en la consola
      error: (err) => {
        console.error('Error al cargar los productos:', err);
      }
    });
  }
}
