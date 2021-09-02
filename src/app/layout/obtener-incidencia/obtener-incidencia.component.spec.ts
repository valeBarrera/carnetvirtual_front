import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerIncidenciaComponent } from './obtener-incidencia.component';

describe('ObtenerIncidenciaComponent', () => {
  let component: ObtenerIncidenciaComponent;
  let fixture: ComponentFixture<ObtenerIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerIncidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
