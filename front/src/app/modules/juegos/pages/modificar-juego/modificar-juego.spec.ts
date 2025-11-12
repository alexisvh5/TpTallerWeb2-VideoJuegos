import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarJuego } from './modificar-juego';

describe('ModificarJuego', () => {
  let component: ModificarJuego;
  let fixture: ComponentFixture<ModificarJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
