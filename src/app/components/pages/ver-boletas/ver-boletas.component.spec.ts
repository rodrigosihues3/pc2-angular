import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBoletasComponent } from './ver-boletas.component';

describe('VerBoletasComponent', () => {
  let component: VerBoletasComponent;
  let fixture: ComponentFixture<VerBoletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerBoletasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerBoletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
