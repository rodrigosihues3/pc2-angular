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
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },

  // Rutas del login
  { path: 'registrarse', component: RegistroComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },

  // --- GRUPO DE RUTAS PARA USUARIOS ---
  {
    path: 'usuarios',
    children: [
      { path: 'ver', component: VerUsuariosComponent },
      { path: '', redirectTo: 'ver', pathMatch: 'full' }
    ]
  },

  // --- GRUPO DE RUTAS PARA PRODUCTOS ---
  {
    path: 'productos',
    children: [
      { path: 'ver', component: VerProductosComponent },
      { path: '', redirectTo: 'ver', pathMatch: 'full' }
    ]
  },

  // --- GRUPO DE RUTAS PARA BOLETAS ---
  {
    path: 'boletas',
    children: [
      { path: 'crear', component: CrearBoletaComponent },   // Accede con /boletas/crear
      { path: 'ver', component: VerBoletasComponent },     // Accede con /boletas/ver
      { path: '', redirectTo: 'ver', pathMatch: 'full' } // Si solo van a /boletas, redirige a ver
    ]
  },

  // Rutas por defecto y de redirección
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Si no hay ruta, redirige a /inicio
  { path: '**', redirectTo: '/', pathMatch: 'full' },  // Si la ruta no existe, redirige a /inicio
];
