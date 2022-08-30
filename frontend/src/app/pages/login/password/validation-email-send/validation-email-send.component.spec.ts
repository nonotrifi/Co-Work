import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEmailSendComponent } from './validation-email-send.component';

describe('ValidationEmailSendComponent', () => {
  let component: ValidationEmailSendComponent;
  let fixture: ComponentFixture<ValidationEmailSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationEmailSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
