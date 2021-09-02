import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFarmaciaComponent } from './gestion-farmacia.component';

describe('GestionFarmaciaComponent', () => {
  let component: GestionFarmaciaComponent;
  let fixture: ComponentFixture<GestionFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFarmaciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
