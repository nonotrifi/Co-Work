import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMaterialsAdminComponent } from './reservation-materials-admin.component';

describe('ReservationMaterialsAdminComponent', () => {
  let component: ReservationMaterialsAdminComponent;
  let fixture: ComponentFixture<ReservationMaterialsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMaterialsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationMaterialsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
