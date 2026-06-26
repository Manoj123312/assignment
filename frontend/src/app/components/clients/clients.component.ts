import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  selectedClientId: number | null = null;
  message: string = '';
  isError: boolean = false;

  formData = { name: '', email: '', address: '', phone: '' };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => { this.clients = data; },
      error: (err) => { this.showMessage('Failed to load clients.', true); }
    });
  }

  openCreateForm(): void {
    this.editMode = false;
    this.selectedClientId = null;
    this.formData = { name: '', email: '', address: '', phone: '' };
    this.showForm = true;
  }

  openEditForm(client: any): void {
    this.editMode = true;
    this.selectedClientId = client.id;
    this.formData = { name: client.name, email: client.email, address: client.address, phone: client.phone };
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.editMode && this.selectedClientId) {
      this.clientService.updateClient(this.selectedClientId, this.formData).subscribe({
        next: () => { this.showMessage('Client updated.', false); this.showForm = false; this.loadClients(); },
        error: (err) => { this.showMessage(err.error?.message || 'Update failed.', true); }
      });
    } else {
      this.clientService.createClient(this.formData).subscribe({
        next: () => { this.showMessage('Client created.', false); this.showForm = false; this.loadClients(); },
        error: (err) => { this.showMessage(err.error?.message || 'Create failed.', true); }
      });
    }
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => { this.showMessage('Client deleted.', false); this.loadClients(); },
        error: (err) => { this.showMessage('Delete failed.', true); }
      });
    }
  }

  cancel(): void {
    this.showForm = false;
  }

  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => { this.message = ''; }, 3000);
  }
}
