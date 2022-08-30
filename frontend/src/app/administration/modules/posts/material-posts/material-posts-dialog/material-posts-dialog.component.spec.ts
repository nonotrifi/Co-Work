import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPostsDialogComponent } from './material-posts-dialog.component';

describe('MaterialPostsDialogComponent', () => {
  let component: MaterialPostsDialogComponent;
  let fixture: ComponentFixture<MaterialPostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPostsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
