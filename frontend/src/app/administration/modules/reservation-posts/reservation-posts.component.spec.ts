import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPostsComponent } from './reservation-posts.component';

describe('ReservationPostsComponent', () => {
  let component: ReservationPostsComponent;
  let fixture: ComponentFixture<ReservationPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
