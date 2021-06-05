import { TestBed } from '@angular/core/testing';

import { BookActionsService } from './book-actions.service';

describe('BookActionsService', () => {
  let service: BookActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});