import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then(m => m.HomeComponent) },
  { path: 'styles', loadComponent: () => import('./pages/styles').then(m => m.StylesComponent) },
  { path: 'salons', loadComponent: () => import('./pages/salons').then(m => m.SalonsComponent) },
  { path: 'book/:id', loadComponent: () => import('./pages/book').then(m => m.BookComponent) },
  { path: 'try-on', loadComponent: () => import('./pages/tryon').then(m => m.TryonComponent) },
  { path: 'owner', loadComponent: () => import('./pages/owner').then(m => m.OwnerComponent) },
  { path: '**', redirectTo: '' },
];
