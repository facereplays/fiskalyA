import { TestBed } from '@angular/core/testing';

import { FileReadService } from './file-read.service';

describe('FileReadService', () => {
  let service: FileReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
