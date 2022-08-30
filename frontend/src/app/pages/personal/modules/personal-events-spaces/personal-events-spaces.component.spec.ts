import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEventsSpacesComponent } from './personal-events-spaces.component';

describe('PersonalEventsSpacesComponent', () => {
  let component: PersonalEventsSpacesComponent;
  let fixture: ComponentFixture<PersonalEventsSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalEventsSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalEventsSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
