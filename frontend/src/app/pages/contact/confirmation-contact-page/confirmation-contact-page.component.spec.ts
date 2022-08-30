import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationContactPageComponent } from './confirmation-contact-page.component';

describe('ConfirmationContactPageComponent', () => {
  let component: ConfirmationContactPageComponent;
  let fixture: ComponentFixture<ConfirmationContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationContactPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
