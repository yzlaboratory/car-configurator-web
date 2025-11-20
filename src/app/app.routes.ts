import { Routes } from '@angular/router';
import { Configurator } from './home/feature/configurator/configurator';

export const routes: Routes = [
  {
    path: '',
    component: Configurator,
    title: '',
  },
  {
    path: ':configId',
    component: Configurator,
    title: '',
  },
];
