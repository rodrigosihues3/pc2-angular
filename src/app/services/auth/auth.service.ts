import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private readonly USER_KEY = 'currentUser'; // Clave para el localStorage

  constructor(private http: HttpClient, private router: Router) { }

  // Metodo para el login
  login(email: string, password: string): Observable<boolean> {
    // json-server permite filtrar así: ?email=valor&password=valor
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(users[0]));
          return true;
        }
        return false;
      })
    );
  }

  // Método para el logout
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  // Revisa si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  // Obtiene los datos del usuario actual
  getCurrentUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // --- MÉTODO REGISTER CON BLOQUEO DE USUARIO EXISTENTE ---
  register(userData: any): Observable<any> {
    // GET para buscar si ya existe un usuario con ese DNI.
    return this.http.get<any[]>(`${this.apiUrl}?dni=${userData.dni}`).pipe(
      switchMap(existingUsers => {
        // Comprobar la respuesta.
        if (existingUsers.length > 0) {
          // Si el array no está vacío, el DNI ya existe. Lanzamos un error.
          return throwError(() => new Error('El DNI ya se encuentra registrado.'));
        } else {
          // Si el array está vacío, el DNI está libre. Procedemos a crear el usuario.
          return this.http.post(this.apiUrl, userData);
        }
      })
    );
  }

  // Obtener usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_sort=id&_order=desc`);
  }
}
