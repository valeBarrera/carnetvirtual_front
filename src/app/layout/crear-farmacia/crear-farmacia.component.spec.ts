import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFarmaciaComponent } from './crear-farmacia.component';

describe('CrearFarmaciaComponent', () => {
  let component: CrearFarmaciaComponent;
  let fixture: ComponentFixture<CrearFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFarmaciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
