import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkServiceComponent } from './cowork-service.component';

describe('CoworkServiceComponent', () => {
  let component: CoworkServiceComponent;
  let fixture: ComponentFixture<CoworkServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoworkServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
