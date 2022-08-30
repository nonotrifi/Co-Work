import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSpacesAdminComponent } from './reservation-spaces-admin.component';

describe('ReservationSpacesAdminComponent', () => {
  let component: ReservationSpacesAdminComponent;
  let fixture: ComponentFixture<ReservationSpacesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationSpacesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSpacesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
