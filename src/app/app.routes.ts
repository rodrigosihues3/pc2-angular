// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importa tus componentes de las páginas
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { IniciarSesionComponent } from './components/pages/iniciar-sesion/iniciar-sesion.component';
import { CrearBoletaComponent } from './components/pages/crear-boleta/crear-boleta.component';
import { VerUsuariosComponent } from './components/pages/ver-usuarios/ver-usuarios.component';
import { VerBoletasComponent } from './components/pages/ver-boletas/ver-boletas.component';
import { VerProductosComponent } from './components/pages/ver-productos/ver-productos.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: IniciarSesionComponent },
  { path: 'crear-boleta', component: CrearBoletaComponent },
  { path: 'usuarios', component: VerUsuariosComponent },
  { path: 'boletas', component: VerBoletasComponent },
  { path: 'productos', component: VerProductosComponent },

  // Rutas por defecto y de redirección
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Si no hay ruta, redirige a /inicio
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }  // Si la ruta no existe, redirige a /inicio
];
