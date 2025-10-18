import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionComponent } from './iniciar-sesion.component';

describe('IniciarSesionComponent', () => {
  //Declaramos las variables para el entorno de prueba
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;
  
  // COnfiguramos el entorno de de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionComponent]
    })
    .compileComponents();

    //creamos una instancia del componente dentro del entorno de pruebas
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
   //verfica que el compoennte se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
