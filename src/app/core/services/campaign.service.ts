import { Injectable, inject } from '@angular/core';
import { collection } from 'firebase/firestore';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { isCampaignActive } from 'src/app/core/utils';
import { FIRESTORE, collectionSignal } from 'src/app/core/firestore';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private readonly db = inject(FIRESTORE);
  private readonly col = collection(this.db, 'campaigns');

  readonly all = collectionSignal<Campaign>(this.col);

  getById(id: string): Campaign | undefined {
    return this.all().find((campaign) => campaign.id === id);
  }

  active(): Campaign[] {
    return this.all().filter((campaign) => isCampaignActive(campaign));
  }
}
