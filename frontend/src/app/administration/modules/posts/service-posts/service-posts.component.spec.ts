import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePostsComponent } from './service-posts.component';

describe('ServicePostsComponent', () => {
  let component: ServicePostsComponent;
  let fixture: ComponentFixture<ServicePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
