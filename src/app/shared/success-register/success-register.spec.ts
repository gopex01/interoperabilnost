import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegister } from './success-register';

describe('SuccessRegister', () => {
  let component: SuccessRegister;
  let fixture: ComponentFixture<SuccessRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
