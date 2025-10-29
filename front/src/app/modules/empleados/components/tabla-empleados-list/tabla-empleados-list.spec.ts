import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEmpleadosList } from './tabla-empleados-list';

describe('TablaEmpleadosList', () => {
  let component: TablaEmpleadosList;
  let fixture: ComponentFixture<TablaEmpleadosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaEmpleadosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaEmpleadosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
