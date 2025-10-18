import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible de forma global en toda la aplicación
})
export class BoletaService {
  // URL base del endpoint del backend para boletas
  private apiUrl = 'http://localhost:3000/boletas';

  constructor(private http: HttpClient) { }

  // Obtiene la lista completa de boletas desde el servidor
  getBoletas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtiene una boleta especifica por su ID
  getBoletaById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
