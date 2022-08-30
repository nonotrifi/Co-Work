import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEventsAdminComponent } from './reservation-events-admin.component';

describe('ReservationEventsAdminComponent', () => {
  let component: ReservationEventsAdminComponent;
  let fixture: ComponentFixture<ReservationEventsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationEventsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationEventsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
