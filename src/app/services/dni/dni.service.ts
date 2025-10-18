import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

// Decorador que indica que este servicio puede ser inyectado en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class DniService {
    // URL base del backend o proxy local que consultará los datos del DNI
  private proxyApiUrl = 'http://localhost:3001/api/dni';
  // Se inyecta HttpClient para poder realizar peticiones HTTP
  constructor(private http: HttpClient) { }

  // Método público que consulta el DNI y devuelve un observable con los datos
  consultarDni(numeroDni: string): Observable<any> {
    // URL con el parámetro "numero"
    const url = `${this.proxyApiUrl}/${numeroDni}`;

     // Realiza una petición GET y transforma la respuesta con map()
    return this.http.get(url).pipe(
      map((response: any) => {
          // Se extraen los campos relevantes del JSON recibido y se devuelven con un formato personalizado
        return {
          nombres: response.first_name,
          apellidos: `${response.first_last_name} ${response.second_last_name}`,
        }
      })
    );
  }
}
