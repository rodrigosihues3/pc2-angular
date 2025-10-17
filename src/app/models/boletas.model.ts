// src/app/models/boleta.model.ts

// Interfaz para el objeto "emisor" dentro de la boleta
export interface Emisor {
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  direccion: string;
}

// Interfaz para el objeto "cliente" dentro de la boleta
export interface Cliente {
  dni: string;
  nombres: string;
  apellidos: string;
}

// Interfaz para cada producto en la lista "productos" de la boleta
// Ojo: es diferente al modelo Producto principal
export interface ProductoBoleta {
  id: number;
  cantidad: number;
  descripcion: string;
  valorUnitario: number;
  precioUnitario: number;
  igvItem: number;
  importeTotalItem: number;
}

// Interfaz para el objeto "leyenda"
export interface Leyenda {
  codigo: string;
  valor: string;
}

// --- Interfaz Principal que une todo ---
export interface Boleta {
  id: number;
  fechaEmision: string; // Se maneja como string, Angular puede convertirlo a Date si es necesario
  emisor: Emisor;
  cliente: Cliente;
  productos: ProductoBoleta[]; // Indicamos que es un array de ProductoBoleta
  totalOpGravadas: number;
  totalIgv: number;
  importeTotal: number;
  leyenda: Leyenda[]; // Indicamos que es un array de Leyenda
}
