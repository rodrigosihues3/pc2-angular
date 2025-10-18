import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBoletaComponent } from './detalle-boleta.component';

describe('DetalleBoletaComponent', () => {
  let component: DetalleBoletaComponent;
  let fixture: ComponentFixture<DetalleBoletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleBoletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
