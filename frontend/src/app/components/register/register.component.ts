import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const repeat = group.get('repeatPassword')?.value;
    return password === repeat ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    const { name, email, address, password } = this.registerForm.value;
    this.authService.register({ name, email, address, password }).subscribe({
      next: (res) => {
        this.isError = false;
        this.message = 'Registration successful! Redirecting to login...';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.isError = true;
        this.message = err.error?.message || 'Registration failed.';
        this.isLoading = false;
      }
    });
  }
}
