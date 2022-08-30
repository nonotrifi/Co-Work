import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPostsComponent } from './material-posts.component';

describe('MaterialPostsComponent', () => {
  let component: MaterialPostsComponent;
  let fixture: ComponentFixture<MaterialPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
