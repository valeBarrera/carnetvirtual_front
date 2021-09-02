import { TestBed } from '@angular/core/testing';

import { MesonService } from './meson.service';

describe('MesonService', () => {
  let service: MesonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
