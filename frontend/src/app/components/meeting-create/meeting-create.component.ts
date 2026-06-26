import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../services/meeting.service';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-meeting-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './meeting-create.component.html',
  styleUrl: './meeting-create.component.css'
})
export class MeetingCreateComponent implements OnInit {
  meeting = { topic: '', number_of_people: 1, start_time: '', client_id: 0 };
  clients: Client[] = [];
  errorMessage = '';

  constructor(
    private meetingService: MeetingService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (data) => { this.clients = data; },
      error: () => { this.errorMessage = 'Failed to load clients.'; }
    });
  }

  onSubmit(): void {
    this.meetingService.create(this.meeting as any).subscribe({
      next: () => { this.router.navigate(['/meetings']); },
      error: (err) => { this.errorMessage = err.error?.error || 'Failed to schedule meeting.'; }
    });
  }
}
