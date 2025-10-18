import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DniService {
  private proxyApiUrl = 'http://localhost:3001/api/dni';

  constructor(private http: HttpClient) { }

  consultarDni(numeroDni: string): Observable<any> {
    // URL con el parámetro "numero"
    const url = `${this.proxyApiUrl}/${numeroDni}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        return {
          nombres: response.first_name,
          apellidos: `${response.first_last_name} ${response.second_last_name}`,
        }
      })
    );
  }
}
