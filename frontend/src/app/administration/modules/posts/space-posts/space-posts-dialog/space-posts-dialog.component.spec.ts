import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePostsDialogComponent } from './space-posts-dialog.component';

describe('SpacePostsDialogComponent', () => {
  let component: SpacePostsDialogComponent;
  let fixture: ComponentFixture<SpacePostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacePostsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacePostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
