import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit {
  client = { name: '', email: '', address: '', password: '' };
  errorMessage = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getById(id).subscribe({
      next: (data) => {
        this.client = { name: data.name, email: data.email, address: data.address, password: '' };
      },
      error: () => { this.errorMessage = 'Failed to load client.'; }
    });
  }

  onSubmit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.update(id, this.client as any).subscribe({
      next: () => { this.router.navigate(['/clients']); },
      error: (err) => { this.errorMessage = err.error?.error || 'Failed to update client.'; }
    });
  }
}
