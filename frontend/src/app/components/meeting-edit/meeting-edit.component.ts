import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../services/meeting.service';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-meeting-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './meeting-edit.component.html',
  styleUrl: './meeting-edit.component.css'
})
export class MeetingEditComponent implements OnInit {
  meeting = { topic: '', number_of_people: 1, start_time: '', client_id: 0 };
  clients: Client[] = [];
  errorMessage = '';

  constructor(
    private meetingService: MeetingService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getAll().subscribe({ next: (data) => { this.clients = data; } });
    this.meetingService.getById(id).subscribe({
      next: (data) => {
        const dt = new Date(data.start_time);
        const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        this.meeting = {
          topic: data.topic,
          number_of_people: data.number_of_people,
          start_time: local,
          client_id: data.client_id
        };
      },
      error: () => { this.errorMessage = 'Failed to load meeting.'; }
    });
  }

  onSubmit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.meetingService.update(id, this.meeting as any).subscribe({
      next: () => { this.router.navigate(['/meetings']); },
      error: (err) => { this.errorMessage = err.error?.error || 'Failed to update meeting.'; }
    });
  }
}
