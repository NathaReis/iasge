import { TestBed } from '@angular/core/testing';

import { CodePagesPermissionsService } from './code-pages-permissions.service';

describe('CodePagesPermissionsService', () => {
  let service: CodePagesPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePagesPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
