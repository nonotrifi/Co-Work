import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMaterialsSpacesComponent } from './personal-materials-spaces.component';

describe('PersonalMaterialsSpacesComponent', () => {
  let component: PersonalMaterialsSpacesComponent;
  let fixture: ComponentFixture<PersonalMaterialsSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalMaterialsSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalMaterialsSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
