import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengSpinner } from './primeng-spinner';

describe('PrimengSpinner', () => {
  let component: PrimengSpinner;
  let fixture: ComponentFixture<PrimengSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimengSpinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimengSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
