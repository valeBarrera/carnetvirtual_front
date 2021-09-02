import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQrComponent } from './card-qr.component';

describe('CardQrComponent', () => {
  let component: CardQrComponent;
  let fixture: ComponentFixture<CardQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
