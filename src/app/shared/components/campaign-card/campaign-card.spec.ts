import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CampaignCard, CampaignState } from 'src/app/shared/components/campaign-card/campaign-card';
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

  function render(state?: CampaignState) {
    const fixture = TestBed.createComponent(CampaignCard);
    fixture.componentRef.setInput('campaign', campaign);
    if (state) {
      fixture.componentRef.setInput('state', state);
    }
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should create and show the title and audience', () => {
    const el = render();
    expect(el.textContent).toContain('Campanha de Gripe 2026');
    expect(el.textContent).toContain('De 6 meses a 5 anos');
  });

  it('should show the "Ativa" tag when active', () => {
    expect(render('active').textContent).toContain('Ativa');
  });

  it('should show the "Em breve" tag when upcoming', () => {
    expect(render('upcoming').textContent).toContain('Em breve');
  });

  it('should not show any tag when ended', () => {
    const el = render('ended');
    expect(el.textContent).not.toContain('Ativa');
    expect(el.textContent).not.toContain('Em breve');
  });
});
