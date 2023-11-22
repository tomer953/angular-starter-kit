import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Route[] = [
  {
    path: '',
    component: PagesComponent,
    children: [],
  },
];

export default routes;
