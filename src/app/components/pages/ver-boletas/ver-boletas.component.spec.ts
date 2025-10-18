import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBoletasComponent } from './ver-boletas.component';

// Define un bloque de pruebas para el componente VerBoletasComponent
describe('VerBoletasComponent', () => {
  let component: VerBoletasComponent;
  let fixture: ComponentFixture<VerBoletasComponent>;

  beforeEach(async () => {
       // Configura el entorno de pruebas del componente
    await TestBed.configureTestingModule({
      imports: [VerBoletasComponent]
    })
        // Compila los componentes para poder instanciarlos en pruebas
    .compileComponents();

    fixture = TestBed.createComponent(VerBoletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 //Verifica que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
