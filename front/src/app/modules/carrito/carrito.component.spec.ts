import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:front/src/app/modules/juegos/pages/buscar-juego/buscar-juego.spec.ts
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
========
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
>>>>>>>> 7e64b347d9f80c5585069491b8e3a7b1de78fd16:front/src/app/modules/carrito/carrito.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
