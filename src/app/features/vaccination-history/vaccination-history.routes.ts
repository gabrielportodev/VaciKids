import { Routes } from '@angular/router';

export const vaccinationHistoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/features/vaccination-history/pages/history-page/history-page').then(
        (m) => m.HistoryPage,
      ),
  },
];
