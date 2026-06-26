import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent {
  client = { name: '', email: '', address: '', password: '', repeatPassword: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit(): void {
    if (this.client.password !== this.client.repeatPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    const { repeatPassword, ...payload } = this.client;
    this.clientService.create(payload).subscribe({
      next: () => { this.router.navigate(['/clients']); },
      error: (err) => { this.errorMessage = err.error?.error || 'Failed to create client.'; }
    });
  }
}
