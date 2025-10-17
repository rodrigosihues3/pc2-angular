import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl = 'http://localhost:3000/boletas';

  constructor(private http: HttpClient) { }

  // Obtiene todas las boletas
  getBoletas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBoletaById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
