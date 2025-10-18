import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosComponent } from './ver-productos.component';

// Define el bloque de pruebas para el componente Productos
describe('VerProductosComponent', () => {
  let component: VerProductosComponent;
  let fixture: ComponentFixture<VerProductosComponent>;

  beforeEach(async () => {
    // Configura el módulo de prueba de Angular
    await TestBed.configureTestingModule({
      imports: [VerProductosComponent]
    })
    .compileComponents();

     // Crea una instancia del componente en un entorno de prueba
    fixture = TestBed.createComponent(VerProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 // Verifica que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
