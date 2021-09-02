import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarIncidenciaComponent } from './gestionar-incidencia.component';

describe('GestionarIncidenciaComponent', () => {
  let component: GestionarIncidenciaComponent;
  let fixture: ComponentFixture<GestionarIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarIncidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
