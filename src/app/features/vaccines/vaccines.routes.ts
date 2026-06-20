import { Routes } from '@angular/router';

export const vaccinesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/features/vaccines/pages/vaccine-list/vaccine-list').then(
        (m) => m.VaccineList,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/features/vaccines/pages/vaccine-detail/vaccine-detail').then(
        (m) => m.VaccineDetail,
      ),
  },
];
