import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  // Obtiene todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
