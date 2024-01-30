import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosReadComponent } from './usuarios-read.component';

describe('UsuariosReadComponent', () => {
  let component: UsuariosReadComponent;
  let fixture: ComponentFixture<UsuariosReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosReadComponent]
    });
    fixture = TestBed.createComponent(UsuariosReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
