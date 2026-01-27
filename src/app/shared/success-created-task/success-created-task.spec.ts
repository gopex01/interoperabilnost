import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreatedTask } from './success-created-task';

describe('SuccessCreatedTask', () => {
  let component: SuccessCreatedTask;
  let fixture: ComponentFixture<SuccessCreatedTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessCreatedTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCreatedTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
