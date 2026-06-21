import { TestBed } from '@angular/core/testing';
import { Loading } from 'src/app/shared/components/loading/loading';

describe('Loading', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Loading] }).compileComponents();
  });

  function render(inputs?: { label?: string; inline?: boolean }) {
    const fixture = TestBed.createComponent(Loading);
    if (inputs?.label !== undefined) {
      fixture.componentRef.setInput('label', inputs.label);
    }
    if (inputs?.inline !== undefined) {
      fixture.componentRef.setInput('inline', inputs.inline);
    }
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the default label', () => {
    const el = render().nativeElement as HTMLElement;
    expect(el.textContent).toContain('Carregando');
    expect(el.querySelector('ion-spinner')).not.toBeNull();
  });

  it('should show a custom label', () => {
    const el = render({ label: 'Salvando…' }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Salvando…');
  });

  it('should render the block variant by default', () => {
    const el = render().nativeElement as HTMLElement;
    expect(el.querySelector('div[role="status"]')).not.toBeNull();
    expect(el.querySelector('span[role="status"]')).toBeNull();
  });

  it('should render the inline variant when inline is set', () => {
    const el = render({ inline: true }).nativeElement as HTMLElement;
    expect(el.querySelector('span[role="status"]')).not.toBeNull();
    expect(el.querySelector('div[role="status"]')).toBeNull();
  });
});
