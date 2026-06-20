import { Routes } from '@angular/router';

export const campaignsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/features/campaigns/pages/campaign-list/campaign-list').then(
        (m) => m.CampaignList,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/features/campaigns/pages/campaign-detail/campaign-detail').then(
        (m) => m.CampaignDetail,
      ),
  },
];
