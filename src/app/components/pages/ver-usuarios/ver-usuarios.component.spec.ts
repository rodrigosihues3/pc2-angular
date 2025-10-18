import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosComponent } from './ver-usuarios.component';

// Describe el conjunto de pruebas para el componente VerUsuariosComponent
describe('VerUsuariosComponent', () => {
  let component: VerUsuariosComponent;
  let fixture: ComponentFixture<VerUsuariosComponent>;

   // beforeEach se ejecuta antes de cada prueba individual
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUsuariosComponent]
    })
    .compileComponents();
  // Crea una instancia del componente y su entorno
    fixture = TestBed.createComponent(VerUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
