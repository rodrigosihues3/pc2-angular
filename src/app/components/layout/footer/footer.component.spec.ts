import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

//Grupo de pruebas para el componente footer
describe('FooterComponent', () => {
  let component: FooterComponent; // instancia del componente             
  let fixture: ComponentFixture<FooterComponent>; // Entorno de prueba

  //configuracion del entorno de pruebas de Angular
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent] // Componente a probar
    })
    .compileComponents(); // compila las plantillas y estilos del componentes

    //Crea una instancia dentro de la prueba
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componete se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
