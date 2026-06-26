import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  errorMessage = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void { this.loadClients(); }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => { this.clients = data; },
      error: (err) => { this.errorMessage = 'Failed to load clients. Is the backend running?'; }
    });
  }

  deleteClient(id: number): void {
    if (!confirm('Are you sure you want to delete this client?')) return;
    this.clientService.delete(id).subscribe({
      next: () => { this.clients = this.clients.filter(c => c.id !== id); },
      error: (err) => { this.errorMessage = 'Failed to delete client.'; }
    });
  }
}
