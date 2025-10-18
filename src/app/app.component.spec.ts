import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Se Utiliza el entorno de pruebas de Angular (TestBed) para crear instancias y verificar que funcione correctamente 
describe('AppComponent', () => {

  // Importamos el componente que vamos a testear
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Verifica que el componente principal se cree correctamente, si existe, la prueba pasa
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Comprobamos que el compoonente tenga la propiedad "title" con el valor que deberia tener 
  it(`should have the 'boleteando' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('boleteando');
  });

  // Verifica que el titulo se renderize correctamente en el DOM
  // dentro de un elemento <h1>
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, boleteando');
  });
});
