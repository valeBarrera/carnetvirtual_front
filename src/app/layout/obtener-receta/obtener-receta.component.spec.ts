import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerRecetaComponent } from './obtener-receta.component';

describe('ObtenerRecetaComponent', () => {
  let component: ObtenerRecetaComponent;
  let fixture: ComponentFixture<ObtenerRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
