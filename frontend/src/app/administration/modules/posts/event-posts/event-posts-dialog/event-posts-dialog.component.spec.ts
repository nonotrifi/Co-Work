import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPostsDialogComponent } from './event-posts-dialog.component';

describe('EventPostsDialogComponent', () => {
  let component: EventPostsDialogComponent;
  let fixture: ComponentFixture<EventPostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventPostsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventPostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
