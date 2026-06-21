import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChildCard } from 'src/app/shared/components/child-card/child-card';
import { Child } from 'src/app/shared/models/child.model';
import { ChildSummary } from 'src/app/shared/models/child-summary.model';

const child: Child = {
  id: 'c1',
  name: 'Maria Silva',
  birthDate: '2020-01-15',
};

const summary: ChildSummary = {
  applied: 5,
  pending: 1,
  overdue: 2,
  total: 8,
  appliedPercent: 62,
  overduePercent: 25,
};

describe('ChildCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function render(input: Child, childSummary: ChildSummary = summary) {
    const fixture = TestBed.createComponent(ChildCard);
    fixture.componentRef.setInput('child', input);
    fixture.componentRef.setInput('summary', childSummary);
    fixture.detectChanges();
    return fixture;
  }

  it('should create and show the child name', () => {
    const el = render(child).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Maria Silva');
  });

  it('should show initials when there is no photo', () => {
    const el = render(child).nativeElement as HTMLElement;
    expect(el.querySelector('app-child-avatar img')).toBeNull();
    expect(el.textContent).toContain('MS');
  });

  it('should render the photo when photoUrl is provided', () => {
    const el = render({ ...child, photoUrl: 'photo.png' }).nativeElement as HTMLElement;
    const img = el.querySelector('app-child-avatar img');
    expect(img?.getAttribute('src')).toBe('photo.png');
  });

  it('should show the applied/total summary and overdue count', () => {
    const el = render(child, summary).nativeElement as HTMLElement;
    expect(el.textContent).toContain('5/8 em dia');
    expect(el.textContent).toContain('2 atrasada(s)');
  });

  it('should show "Tudo certo" when there are no overdue vaccines', () => {
    const el = render(child, { ...summary, overdue: 0 }).nativeElement as HTMLElement;
    expect(el.textContent).toContain('Tudo certo');
    expect(el.textContent).not.toContain('atrasada(s)');
  });
});
