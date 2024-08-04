import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginJwtComponent } from './sigin-jwt.component';

describe('SiginJwtComponent', () => {
  let component: SiginJwtComponent;
  let fixture: ComponentFixture<SiginJwtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiginJwtComponent]
    });
    fixture = TestBed.createComponent(SiginJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
