import { TestBed } from '@angular/core/testing';
import { StatusBadge } from 'src/app/shared/components/status-badge/status-badge';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';

describe('StatusBadge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatusBadge] }).compileComponents();
  });

  function render(status: VaccinationStatus) {
    const fixture = TestBed.createComponent(StatusBadge);
    fixture.componentRef.setInput('status', status);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    expect(render('applied').componentInstance).toBeTruthy();
  });

  const cases: [VaccinationStatus, string][] = [
    ['applied', 'Em dia'],
    ['pending', 'Próxima'],
    ['overdue', 'Atrasada'],
  ];

  for (const [status, label] of cases) {
    it(`should show "${label}" for status "${status}"`, () => {
      const fixture = render(status);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain(label);
    });
  }

  it('should render an icon alongside the label', () => {
    const fixture = render('overdue');
    const icon = (fixture.nativeElement as HTMLElement).querySelector('ion-icon');
    expect(icon).not.toBeNull();
  });
});
