import { TestBed } from '@angular/core/testing';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';

describe('EmptyState', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmptyState] }).compileComponents();
  });

  function render(inputs: { title: string; description?: string; icon?: string }) {
    const fixture = TestBed.createComponent(EmptyState);
    fixture.componentRef.setInput('title', inputs.title);
    if (inputs.description !== undefined) {
      fixture.componentRef.setInput('description', inputs.description);
    }
    if (inputs.icon !== undefined) {
      fixture.componentRef.setInput('icon', inputs.icon);
    }
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the title', () => {
    const el = render({ title: 'Nenhuma criança cadastrada' }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Nenhuma criança cadastrada');
  });

  it('should show the description when provided', () => {
    const el = render({
      title: 'Sem registros',
      description: 'Adicione a primeira criança.',
    }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Adicione a primeira criança.');
  });

  it('should not render a description paragraph when empty', () => {
    const el = render({ title: 'Sem registros' }).nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Adicione');
  });

  it('should render an icon', () => {
    const el = render({ title: 'Sem registros' }).nativeElement as HTMLElement;
    expect(el.querySelector('ion-icon')).not.toBeNull();
  });
});
