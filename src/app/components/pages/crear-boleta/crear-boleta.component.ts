import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { DniService } from '../../../services/dni/dni.service';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto/producto.service';
import { BoletaService } from '../../../services/boleta/boleta.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-crear-boleta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './crear-boleta.component.html',
  styleUrl: './crear-boleta.component.css'
})
export class CrearBoletaComponent implements OnInit, AfterViewInit {
  boletaForm: FormGroup;
  productosDisponibles: any[] = [];
  buscandoCliente = false;
  errorAPI = '';
  fechaActual = new Date();

  constructor(
    private fb: FormBuilder,
    private dniService: DniService,
    private productoService: ProductoService,
    private boletaService: BoletaService,
    private router: Router,
    private authService: AuthService
  ) {
    this.boletaForm = this.fb.group({
      cliente: this.fb.group({
        dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        nombres: [{ value: '', disabled: true }, Validators.required],
        apellidos: [{ value: '', disabled: true }, Validators.required]
      }),
      detalle: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    // Cargamos la lista de productos existentes para el modal
    this.productoService.getProductos().subscribe(data => {
      this.productosDisponibles = data;
    });
  }

  // Helper para acceder fácilmente al FormArray del detalle en el HTML
  get detalleItems(): FormArray {
    return this.boletaForm.get('detalle') as FormArray;
  }

  // --- LÓGICA DEL CLIENTE ---
  buscarCliente() {
    const clienteForm = this.boletaForm.get('cliente') as FormGroup;
    if (clienteForm.get('dni')?.invalid) return;

    // --- LÓGICA DE BLOQUEO AQUÍ A UNO MISMO---
    const dniBuscado = clienteForm.get('dni')?.value;
    const usuarioLogueado = this.authService.getCurrentUser();

    // Comparar DNI buscado con el del usuario logueado.
    if (usuarioLogueado && usuarioLogueado.dni === dniBuscado) {
      this.errorAPI = 'Error: No puedes generar una boleta para ti mismo.';
      // Limpiar los campos por si había datos anteriores
      clienteForm.get('nombres')?.setValue('');
      clienteForm.get('apellidos')?.setValue('');
      return; // Detenemos la ejecución
    }

    this.buscandoCliente = true;
    this.errorAPI = '';
    const dni = clienteForm.get('dni')?.value;

    this.dniService.consultarDni(dni).subscribe({
      next: (data) => {
        clienteForm.patchValue({
          nombres: data.nombres,
          apellidos: data.apellidos
        });
        clienteForm.get('nombres')?.disable();
        clienteForm.get('apellidos')?.disable();
        this.buscandoCliente = false;
      },
      error: () => {
        this.errorAPI = 'DNI no encontrado. Ingrese los datos manualmente.';
        clienteForm.get('nombres')?.enable();
        clienteForm.get('apellidos')?.enable();
        this.buscandoCliente = false;
      }
    });
  }

  // --- LÓGICA DEL DETALLE DE PRODUCTOS ---
  agregarItem(producto: any, cantidad: number) {
    const item = this.fb.group({
      productoId: [producto.id],
      descripcion: [producto.nombre, Validators.required], // Usamos el nombre como descripción
      cantidad: [cantidad, [Validators.required, Validators.min(1)]],
      precioUnitario: [producto.precio, Validators.required]
    });
    this.detalleItems.push(item);
  }

  // MÉTODO para agregar una fila vacía
  agregarItemVacio() {
    const itemVacio = this.fb.group({
      productoId: [null], // No hay ID de producto aún
      descripcion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.detalleItems.push(itemVacio);
  }

  eliminarItem(index: number) {
    this.detalleItems.removeAt(index);
  }

  // --- CÁLCULOS ---
  calcularSubtotal(item: FormGroup): number {
    return item.get('cantidad')?.value * item.get('precioUnitario')?.value;
  }

  calcularTotalGeneral(): number {
    return this.detalleItems.controls.reduce((total, control) => {
      return total + this.calcularSubtotal(control as FormGroup);
    }, 0);
  }

  // --- ACCIÓN FINAL ---
  generarBoleta() {
    if (this.boletaForm.invalid) {
      this.boletaForm.markAllAsTouched();
      return;
    }

    const formValue = this.boletaForm.getRawValue();

    // Construimos el objeto final de la boleta
    const boletaFinal = {
      serie: 'B001',
      numero: Math.floor(Math.random() * 9000) + 1000, // Número aleatorio para el ejemplo
      fechaEmision: new Date().toISOString().split('T')[0], // Fecha de hoy en formato YYYY-MM-DD
      cliente: formValue.cliente,
      detalle: formValue.detalle
    };

    this.boletaService.createBoleta(boletaFinal).subscribe({
      next: (nuevaBoleta) => {
        alert('Boleta generada con éxito!');
        // Navegamos a la vista de detalle de la boleta recién creada
        this.router.navigate(['/boletas/ver-detalle', nuevaBoleta.id]);
      },
      error: (err) => {
        console.error('Error al generar la boleta:', err);
      }
    });
  }

  // Propiedades para manejar el modal
  productoSeleccionadoId: string = '';
  cantidadSeleccionada: number = 1;

  // Referencia al elemento del modal en el HTML
  @ViewChild('agregarProductoModal') modalElement!: ElementRef;
  private modalInstance: any;

  ngAfterViewInit(): void {
    // Inicializamos la instancia del modal de Bootstrap
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // --- LÓGICA DEL MODAL ---
  abrirModalAgregarExistente() {
    // Reseteamos los valores antes de abrir
    this.productoSeleccionadoId = '';
    this.cantidadSeleccionada = 1;
    this.modalInstance.show();
  }

  agregarProductoSeleccionado() {
    if (!this.productoSeleccionadoId || this.cantidadSeleccionada < 1) {
      alert('Por favor, seleccione un producto y una cantidad válida.');
      return;
    }

    const producto = this.productosDisponibles.find(p => p.id == this.productoSeleccionadoId);
    if (producto) {
      this.agregarItem(producto, this.cantidadSeleccionada);
      this.modalInstance.hide(); // Cerramos el modal
    }
  }


}
