import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanPopupComponent } from './trip-plan-popup.component';

describe('TripPlanPopupComponent', () => {
  let component: TripPlanPopupComponent;
  let fixture: ComponentFixture<TripPlanPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripPlanPopupComponent]
    });
    fixture = TestBed.createComponent(TripPlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
