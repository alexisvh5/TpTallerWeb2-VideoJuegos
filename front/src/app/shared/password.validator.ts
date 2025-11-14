import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';

  // Si está vacío, dejamos que Validators.required maneje el error
  if (!value.trim()) {
    return null;
  }

  // Mínimo 6 caracteres
  if (value.length < 6) {
    return { minlength: true };
  }

  // Al menos una mayúscula
  if (!/[A-Z]/.test(value)) {
    return { uppercase: true };
  }

  // Al menos un número
  if (!/[0-9]/.test(value)) {
    return { number: true };
  }

  return null;
}
