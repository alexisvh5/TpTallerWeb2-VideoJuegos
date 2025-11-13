import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarJuego } from './buscar-juego';

describe('BuscarJuego', () => {
  let component: BuscarJuego;
  let fixture: ComponentFixture<BuscarJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
