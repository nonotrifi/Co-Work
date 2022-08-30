import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPersonalProfileComponent } from './modify-personal-profile.component';

describe('ModifyPersonalProfileComponent', () => {
  let component: ModifyPersonalProfileComponent;
  let fixture: ComponentFixture<ModifyPersonalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPersonalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
