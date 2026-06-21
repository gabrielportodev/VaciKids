import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CampaignCard } from 'src/app/shared/components/campaign-card/campaign-card';
import { Campaign } from 'src/app/shared/models/campaign.model';

const campaign: Campaign = {
  id: 'cp1',
  title: 'Campanha de Gripe 2026',
  description: 'Vacinação contra a gripe.',
  startDate: '2026-04-01',
  endDate: '2026-06-30',
  minimumAgeInMonths: 6,
  maximumAgeInMonths: 60,
};

describe('CampaignCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function render(input: Campaign, options?: { active?: boolean; ended?: boolean }) {
    const fixture = TestBed.createComponent(CampaignCard);
    fixture.componentRef.setInput('campaign', input);
    if (options?.active !== undefined) {
      fixture.componentRef.setInput('active', options.active);
    }
    if (options?.ended !== undefined) {
      fixture.componentRef.setInput('ended', options.ended);
    }
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the title and audience', () => {
    const el = render(campaign).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Campanha de Gripe 2026');
    expect(el.textContent).toContain('De 6 meses a 5 anos');
  });

  it('should show the "Ativa" tag when active', () => {
    const el = render(campaign, { active: true }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Ativa');
  });

  it('should not show the "Ativa" tag by default', () => {
    const el = render(campaign).nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Ativa');
  });
});
