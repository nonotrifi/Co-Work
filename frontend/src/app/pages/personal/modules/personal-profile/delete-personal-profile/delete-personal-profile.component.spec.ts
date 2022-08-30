import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePersonalProfileComponent } from './delete-personal-profile.component';

describe('DeletePersonalProfileComponent', () => {
  let component: DeletePersonalProfileComponent;
  let fixture: ComponentFixture<DeletePersonalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePersonalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
