import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalReservationSpacesComponent } from './personal-reservation-spaces.component';

describe('PersonalReservationSpacesComponent', () => {
  let component: PersonalReservationSpacesComponent;
  let fixture: ComponentFixture<PersonalReservationSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalReservationSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalReservationSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
