import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VaccineCard } from 'src/app/shared/components/vaccine-card/vaccine-card';
import { Vaccine } from 'src/app/shared/models/vaccine.model';

const vaccine: Vaccine = {
  id: 'v1',
  name: 'Tríplice Viral',
  description: 'Protege contra sarampo, caxumba e rubéola.',
  recommendedAgeInMonths: 12,
  recommendedAgesInMonths: [12, 15],
  totalDoses: 2,
};

describe('VaccineCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function render(input: Vaccine) {
    const fixture = TestBed.createComponent(VaccineCard);
    fixture.componentRef.setInput('vaccine', input);
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the vaccine name and description', () => {
    const el = render(vaccine).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Tríplice Viral');
    expect(el.textContent).toContain('sarampo, caxumba e rubéola');
  });

  it('should show the recommended age label', () => {
    const el = render(vaccine).nativeElement as HTMLElement;
    expect(el.textContent).toContain('1 ano');
  });

  it('should pluralize the doses label', () => {
    const el = render(vaccine).nativeElement as HTMLElement;
    expect(el.textContent).toContain('2 doses');
  });

  it('should use the singular doses label for a single dose', () => {
    const el = render({ ...vaccine, totalDoses: 1 }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('1 dose');
    expect(el.textContent).not.toContain('1 doses');
  });
});
