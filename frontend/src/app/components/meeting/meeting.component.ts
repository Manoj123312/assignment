import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingService, Meeting } from '../../services/meeting.service';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit {
  meetings: Meeting[] = [];
  clients: Client[] = [];
  formData: Meeting = { meeting_topic: '', number_of_people: 1, start_time: '', end_time: '', client_id: undefined };
  editingId: number | null = null;
  message = '';
  error = '';
  loading = false;
  showForm = false;

  constructor(private meetingService: MeetingService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadMeetings();
    this.clientService.getAll().subscribe({ next: (data) => (this.clients = data) });
  }

  loadMeetings(): void {
    this.meetingService.getAll().subscribe({
      next: (data) => (this.meetings = data),
      error: () => (this.error = 'Failed to load meetings')
    });
  }

  onSubmit(): void {
    this.message = '';
    this.error = '';
    this.loading = true;

    const action = this.editingId
      ? this.meetingService.update(this.editingId, this.formData)
      : this.meetingService.create(this.formData);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.editingId ? 'Meeting updated!' : 'Meeting scheduled!';
        this.resetForm();
        this.loadMeetings();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Operation failed';
      }
    });
  }

  editMeeting(m: Meeting): void {
    this.editingId = m.id!;
    this.formData = {
      meeting_topic: m.meeting_topic,
      number_of_people: m.number_of_people,
      start_time: m.start_time ? m.start_time.slice(0, 16) : '',
      end_time: m.end_time ? m.end_time.slice(0, 16) : '',
      client_id: m.client_id
    };
    this.showForm = true;
  }

  deleteMeeting(id: number): void {
    if (!confirm('Delete this meeting?')) return;
    this.meetingService.delete(id).subscribe({
      next: () => { this.message = 'Meeting deleted'; this.loadMeetings(); },
      error: () => (this.error = 'Delete failed')
    });
  }

  resetForm(): void {
    this.formData = { meeting_topic: '', number_of_people: 1, start_time: '', end_time: '', client_id: undefined };
    this.editingId = null;
    this.showForm = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }
}
