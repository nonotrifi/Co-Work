import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePostsDialogComponent } from './service-posts-dialog.component';

describe('ServicePostsDialogComponent', () => {
  let component: ServicePostsDialogComponent;
  let fixture: ComponentFixture<ServicePostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePostsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
