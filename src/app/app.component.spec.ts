import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';

import * as d3 from 'd3';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ComponentsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Mapa com D3');
  });

  it('should render list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.data = [
      {
        name: 'Pin 1',
        x: 10,
        y: 5,
        color: 'brown',
        id: 'p1',
      },
      {
        name: 'Pin 2',
        x: 200,
        y: 50,
        color: 'brown',
        id: 'p2',
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.list li').length).toBe(2);
    expect(compiled.querySelector('.list')?.textContent).toContain(
      ' Pin 1  Pin 2'
    );
  });

  it('should render pin details', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.data = [
      {
        name: 'Pin 1',
        x: 10,
        y: 5,
        color: 'brown',
        id: 'p1',
      },
      {
        name: 'Pin 2',
        x: 200,
        y: 50,
        color: 'brown',
        id: 'p2',
      },
    ];

    fixture.componentInstance.selectedPin = fixture.componentInstance.data[0];

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pin-details')).toBeTruthy();
    expect(compiled.querySelector('.pin-details')?.textContent).toContain(
      'Pin 1'
    );
  });

  it('should reset zoom', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.resetZoom();

    fixture.detectChanges();
    const compiled = fixture.componentInstance;
    expect(compiled.zoomRatio).toBe(1);
  });


  it('should create pin on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.initD3();

    fixture.debugElement.query(By.css('svg g')).nativeElement.dispatchEvent(
      new Event('click', {
        clientX: 692,
        clientY: 350,
      } as MouseEvent)
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.data.length).toBe(1);
  });

 
});
