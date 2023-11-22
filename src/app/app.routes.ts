import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    canActivate: [() => true],
    loadChildren: () => import('./pages/pages.routes'),
  },
  {
    path: 'error',
    loadComponent: () => import('./error/error.component').then((x) => x.ErrorComponent),
  },
  { path: '**', redirectTo: '' },
];

export default routes;
