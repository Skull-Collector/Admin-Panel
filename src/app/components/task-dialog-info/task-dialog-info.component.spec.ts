import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogInfoComponent } from './task-dialog-info.component';

describe('TaskDialogInfoComponent', () => {
  let component: TaskDialogInfoComponent;
  let fixture: ComponentFixture<TaskDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
