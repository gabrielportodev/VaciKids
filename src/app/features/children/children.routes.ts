import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/features/children/pages/children-list/children-list').then(
        (m) => m.ChildrenList,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('src/app/features/children/pages/child-form/child-form').then((m) => m.ChildForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/features/children/pages/child-profile/child-profile').then(
        (m) => m.ChildProfile,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('src/app/features/children/pages/child-form/child-form').then((m) => m.ChildForm),
  },
];
