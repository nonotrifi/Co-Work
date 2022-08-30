import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEmailComponent } from './personal-email.component';

describe('PersonalEmailComponent', () => {
  let component: PersonalEmailComponent;
  let fixture: ComponentFixture<PersonalEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
