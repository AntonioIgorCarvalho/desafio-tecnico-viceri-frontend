import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/herois', pathMatch: 'full' },
  { 
    path: 'herois', 
    loadComponent: () => import('./components/lista-herois/lista-herois.component').then(m => m.ListaHeroisComponent)
  },
  { 
    path: 'herois/novo', 
    loadComponent: () => import('./components/formulario-heroi/formulario-heroi.component').then(m => m.FormularioHeroiComponent)
  },
  { 
    path: 'herois/editar/:id', 
    loadComponent: () => import('./components/formulario-heroi/formulario-heroi.component').then(m => m.FormularioHeroiComponent)
  }
];