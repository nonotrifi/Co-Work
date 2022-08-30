import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePostsComponent } from './space-posts.component';

describe('SpacePostsComponent', () => {
  let component: SpacePostsComponent;
  let fixture: ComponentFixture<SpacePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
