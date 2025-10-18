import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  // Obtiene todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_sort=id&_order=desc`);
  }

  // --- MÉTODO NUEVO ---
  getProductosByIds(ids: number[]): Observable<any[]> {
    // Creamos un array de peticiones GET, una por cada ID
    const requests = ids.map(id => this.http.get<any>(`${this.apiUrl}/${id}`));
    // forkJoin ejecuta todas las peticiones en paralelo y devuelve los resultados juntos
    return forkJoin(requests);
  }
}
