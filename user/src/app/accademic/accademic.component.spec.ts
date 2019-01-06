import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccademicComponent } from './accademic.component';

describe('AccademicComponent', () => {
  let component: AccademicComponent;
  let fixture: ComponentFixture<AccademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
