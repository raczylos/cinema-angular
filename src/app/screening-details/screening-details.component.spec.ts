import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningDetailsComponent } from './screening-details.component';

describe('ScreeningDetailsComponent', () => {
  let component: ScreeningDetailsComponent;
  let fixture: ComponentFixture<ScreeningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
