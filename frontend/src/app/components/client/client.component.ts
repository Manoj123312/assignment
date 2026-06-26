import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  formData: Client = { name: '', email: '', address: '', phone: '', company: '' };
  editingId: number | null = null;
  message = '';
  error = '';
  loading = false;
  showForm = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: () => (this.error = 'Failed to load clients')
    });
  }

  onSubmit(): void {
    this.message = '';
    this.error = '';
    this.loading = true;

    const action = this.editingId
      ? this.clientService.update(this.editingId, this.formData)
      : this.clientService.create(this.formData);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.editingId ? 'Client updated!' : 'Client created!';
        this.resetForm();
        this.loadClients();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Operation failed';
      }
    });
  }

  editClient(client: Client): void {
    this.editingId = client.id!;
    this.formData = { ...client };
    this.showForm = true;
  }

  deleteClient(id: number): void {
    if (!confirm('Delete this client?')) return;
    this.clientService.delete(id).subscribe({
      next: () => {
        this.message = 'Client deleted';
        this.loadClients();
      },
      error: () => (this.error = 'Delete failed')
    });
  }

  resetForm(): void {
    this.formData = { name: '', email: '', address: '', phone: '', company: '' };
    this.editingId = null;
    this.showForm = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }
}
