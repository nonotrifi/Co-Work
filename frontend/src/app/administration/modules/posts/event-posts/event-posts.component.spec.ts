import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPostsComponent } from './event-posts.component';

describe('EventPostsComponent', () => {
  let component: EventPostsComponent;
  let fixture: ComponentFixture<EventPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
