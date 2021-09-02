import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMesonComponent } from './crear-meson.component';

describe('CrearMesonComponent', () => {
  let component: CrearMesonComponent;
  let fixture: ComponentFixture<CrearMesonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMesonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMesonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
