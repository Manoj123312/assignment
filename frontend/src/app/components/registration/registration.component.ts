import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  formData = { name: '', email: '', address: '', password: '', repeatPassword: '' };
  message = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.message = '';
    this.error = '';

    if (this.formData.password !== this.formData.repeatPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    const { repeatPassword, ...payload } = this.formData;

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.formData = { name: '', email: '', address: '', password: '', repeatPassword: '' };
    this.message = '';
    this.error = '';
  }
}
