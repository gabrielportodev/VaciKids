import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from 'src/app/app';
import { routes } from 'src/app/app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the brand and navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('VaciKids');
    expect(compiled.querySelectorAll('nav a').length).toBe(4);
  });
});
