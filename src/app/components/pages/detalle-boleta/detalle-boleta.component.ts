import { ProductoService } from './../../../services/producto/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BoletaService } from '../../../services/boleta/boleta.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { switchMap, map } from 'rxjs';

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
export class DetalleBoletaComponent implements OnInit {
  boleta: any = null; // Variable para guardar los datos de la boleta
  cargando = true;
  error = '';

  // Totales que calcularemos
  subtotal = 0;
  igv = 0;
  total = 0;

  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private boletaService: BoletaService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    // 1. Leemos el parámetro 'id' de la URL
    const boletaId = this.route.snapshot.paramMap.get('id');

    if (boletaId) {
      // 2. Si hay un ID, llamamos al servicio para obtener los datos
      this.boletaService.getBoletaById(boletaId).pipe(
        switchMap(boleta => {
          this.boleta = boleta;
          const productoIds = boleta.detalle.map((item: any) => item.productoId);
          return this.productoService.getProductosByIds(productoIds);
        })
      ).subscribe({
        next: (data) => {
          this.boleta.detalle.forEach((item: any) => {
            const productoEncontrado = data.find(p => p.id == item.productoId);
            item.descripcion = productoEncontrado ? productoEncontrado.nombre : 'Producto no encontrado';
          });
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

  generarPDF() {
    const doc = new jsPDF();
    const boleta = this.boleta; // Para facilitar el acceso

    // Título y datos de la empresa
    doc.setFontSize(20);
    doc.text('BOLETA DE VENTA', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Nº: ${boleta.serie}-${boleta.numero}`, 105, 30, { align: 'center' });

    // Datos del cliente
    doc.text(`Cliente: ${boleta.cliente.nombres} ${boleta.cliente.apellidos}`, 15, 50);
    doc.text(`DNI: ${boleta.cliente.dni}`, 15, 57);
    doc.text(`Fecha: ${boleta.fechaEmision}`, 150, 57);

    // Detalle de productos (simplificado)
    let y = 70; // Posición vertical inicial
    doc.text('Cant.', 15, y);
    doc.text('Descripción', 40, y);
    doc.text('P. Unit.', 150, y);
    doc.text('Subtotal', 180, y);
    y += 10;

    boleta.detalle.forEach((item: any) => {
      // Usamos el valor unitario (precio sin IGV) para los cálculos
      const valorUnitario = item.precioUnitario / 1.18;
      const subtotalItem = item.cantidad * valorUnitario;

      doc.text(String(item.cantidad), 15, y);
      // USAMOS LA DESCRIPCIÓN ENRIQUECIDA
      doc.text(item.descripcion, 40, y);
      doc.text(String(valorUnitario.toFixed(2)), 150, y, { align: 'right' });
      doc.text(String(subtotalItem.toFixed(2)), 180, y, { align: 'right' });
      y += 7;
    });

    // Totales
    y += 10;
    doc.text(`Subtotal: S/ ${this.subtotal.toFixed(2)}`, 180, y, { align: 'right' });
    y += 7;
    doc.text(`IGV (18%): S/ ${this.igv.toFixed(2)}`, 180, y, { align: 'right' });
    y += 7;
    doc.setFontSize(14);
    doc.text(`TOTAL: S/ ${this.total.toFixed(2)}`, 180, y, { align: 'right' });

    // Guardar el archivo
    doc.save(`boleta-${boleta.serie}-${boleta.numero}.pdf`);
  }
}
