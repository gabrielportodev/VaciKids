import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';

describe('DetailHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function render(title: string, backLink: string) {
    const fixture = TestBed.createComponent(DetailHeader);
    fixture.componentRef.setInput('title', title);
    fixture.componentRef.setInput('backLink', backLink);
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the title', () => {
    const el = render('Detalhes da Vacina', '/vaccines').nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Detalhes da Vacina');
  });

  it('should point the back link to the provided route', () => {
    const el = render('Detalhes da Vacina', '/vaccines').nativeElement as HTMLElement;
    const back = el.querySelector('a[aria-label="Voltar"]');
    expect(back?.getAttribute('href')).toBe('/vaccines');
  });
});
