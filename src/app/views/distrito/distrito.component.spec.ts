import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoComponent } from './distrito.component';

describe('DistritoComponent', () => {
  let component: DistritoComponent;
  let fixture: ComponentFixture<DistritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistritoComponent]
    });
    fixture = TestBed.createComponent(DistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
