export interface Producto {
  id: number;
  nombre?: string; // Opcional por la inconsistencia en el JSON
  nombre_comercial?: string; // Opcional
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
}
