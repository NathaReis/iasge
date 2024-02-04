import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiligrejasistemasComponent } from './perfiligrejasistemas.component';

describe('PerfiligrejasistemasComponent', () => {
  let component: PerfiligrejasistemasComponent;
  let fixture: ComponentFixture<PerfiligrejasistemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfiligrejasistemasComponent]
    });
    fixture = TestBed.createComponent(PerfiligrejasistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
