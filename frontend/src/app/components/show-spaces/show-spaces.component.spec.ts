import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpacesComponent } from './show-spaces.component';

describe('ShowSpacesComponent', () => {
  let component: ShowSpacesComponent;
  let fixture: ComponentFixture<ShowSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
