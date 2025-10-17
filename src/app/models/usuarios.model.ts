export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  user: string;
  password?: string; // El '?' lo hace opcional. Buena práctica para no manejar passwords en el frontend.
  email: string;
  dni: string;
}
