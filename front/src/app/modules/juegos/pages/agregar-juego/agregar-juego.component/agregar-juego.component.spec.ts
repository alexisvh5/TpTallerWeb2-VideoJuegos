import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJuegoComponent } from './agregar-juego.component';

describe('AgregarJuegoComponent', () => {
  let component: AgregarJuegoComponent;
  let fixture: ComponentFixture<AgregarJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
