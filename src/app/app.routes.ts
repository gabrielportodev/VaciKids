import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'children',
    loadChildren: () =>
      import('src/app/features/children/children.routes').then((m) => m.childrenRoutes),
  },
  {
    path: 'vaccines',
    loadChildren: () =>
      import('src/app/features/vaccines/vaccines.routes').then((m) => m.vaccinesRoutes),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('src/app/features/vaccination-history/vaccination-history.routes').then(
        (m) => m.vaccinationHistoryRoutes,
      ),
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('src/app/features/campaigns/campaigns.routes').then((m) => m.campaignsRoutes),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
