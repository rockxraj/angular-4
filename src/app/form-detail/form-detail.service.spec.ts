import { TestBed, inject } from '@angular/core/testing';

import { FormDetailService } from './form-detail.service';

describe('FormDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDetailService]
    });
  });

  it('should be created', inject([FormDetailService], (service: FormDetailService) => {
    expect(service).toBeTruthy();
  }));
});
