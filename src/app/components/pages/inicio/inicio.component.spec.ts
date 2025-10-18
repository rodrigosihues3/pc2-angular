import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponent } from './inicio.component';

//pruebas para el componeente inicio
describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
//configuramos el entorno de prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent]
    })
    .compileComponents();

    //creamos la instancia del componente para probarlo
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
   // Verficia que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
