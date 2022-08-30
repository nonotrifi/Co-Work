import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMaterialDialogComponent } from './booking-material-dialog.component';

describe('BookingMaterialDialogComponent', () => {
  let component: BookingMaterialDialogComponent;
  let fixture: ComponentFixture<BookingMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingMaterialDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
