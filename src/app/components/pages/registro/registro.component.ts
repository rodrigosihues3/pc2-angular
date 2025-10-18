import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DniService } from '../../../services/dni/dni.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

// VALIDADOR PARA CONFIRMAR LA CONTRASEÑA
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  buscandoDNI = false;
  errorAPI = '';
  errorRegistro = '';

  constructor(
    private fb: FormBuilder,
    private dniService: DniService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombres: [{ value: '', disabled: true }, Validators.required],
      apellidos: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  buscarDNI() {
    if (this.registroForm.get('dni')?.invalid) {
      this.errorAPI = 'Por favor, ingrese un DNI válido de 8 dígitos.';
      return;
    }

    this.buscandoDNI = true;
    this.errorAPI = '';
    const dni = this.registroForm.get('dni')?.value;

    this.dniService.consultarDni(dni).subscribe({
      next: (data) => {
        this.registroForm.patchValue({
          nombres: data.nombres,
          apellidos: data.apellidos
        });
        this.registroForm.get('nombres')?.disable();
        this.registroForm.get('apellidos')?.disable();
        this.buscandoDNI = false;
      },
      error: (error) => {
        this.errorAPI = 'DNI no encontrado. Por favor, ingrese sus datos manualmente.';
        // FALLO: La API no encontró datos, habilitamos los campos para edición manual.
        this.registroForm.get('nombres')?.enable();
        this.registroForm.get('apellidos')?.enable();
        this.buscandoDNI = false;
      }
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      // Esto hace que todos los mensajes de error aparezcan a la vez.
      this.registroForm.markAllAsTouched();
      this.errorRegistro = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    // Habilitamos los campos para obtener su valor antes de enviar
    const formValue = this.registroForm.getRawValue();

    const nuevoUsuario = {
      dni: formValue.dni,
      nombres: formValue.nombres,
      apellidos: formValue.apellidos,
      email: formValue.email,
      password: formValue.password
    };

    this.authService.register(nuevoUsuario).subscribe({
      next: () => {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        // 1. El paso de depuración más importante: Ver qué es 'err'
        console.error('Objeto de error completo recibido:', err);

        // 2. Lógica robusta para encontrar y mostrar el mensaje
        if (err && err.message) {
          // Si el error tiene una propiedad .message (como el que creamos)
          this.errorRegistro = err.message;
        } else if (typeof err === 'string') {
          // Si el error es simplemente un texto
          this.errorRegistro = err;
        } else {
          // Fallback para cualquier otro tipo de error
          this.errorRegistro = 'El DNI ya se encuentra registrado o ocurrió un error inesperado.';
        }
      }
    });
  }
}
