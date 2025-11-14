import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDetailComponent } from './juego-detail.component';

describe('JuegoDetailComponent', () => {
  let component: JuegoDetailComponent;
  let fixture: ComponentFixture<JuegoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
