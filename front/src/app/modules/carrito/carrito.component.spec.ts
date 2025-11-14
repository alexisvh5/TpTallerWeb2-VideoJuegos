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

import { CarritoComponent } from './carrito.component';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})})})
