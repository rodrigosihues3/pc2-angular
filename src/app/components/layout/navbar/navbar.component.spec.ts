import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

//Grupo de pruebas para el navbar
describe('NavbarComponent', () => {
  let component: NavbarComponent; //instancia del componente
  let fixture: ComponentFixture<NavbarComponent>; // Entorno de prueba

  // configuracion del entorno de pruebas de Angular
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent] //compoenete a probar
    })
    .compileComponents(); // compila todo lo asosiado al componente

    //crea una instancia del componente dentro del entorno de prueba
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  // Verifica que se haya creado correcctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
