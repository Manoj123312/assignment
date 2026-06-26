import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  clients: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  selectedMeetingId: number | null = null;
  message: string = '';
  isError: boolean = false;

  formData = {
    client_id: '',
    topic: '',
    number_of_people: 1,
    start_time: '',
    description: ''
  };

  constructor(
    private meetingService: MeetingService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadMeetings();
    this.loadClients();
  }

  loadMeetings(): void {
    this.meetingService.getMeetings().subscribe({
      next: (data) => { this.meetings = data; },
      error: () => { this.showMessage('Failed to load meetings.', true); }
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => { this.clients = data; },
      error: () => {}
    });
  }

  openCreateForm(): void {
    this.editMode = false;
    this.selectedMeetingId = null;
    this.formData = { client_id: '', topic: '', number_of_people: 1, start_time: '', description: '' };
    this.showForm = true;
  }

  openEditForm(meeting: any): void {
    this.editMode = true;
    this.selectedMeetingId = meeting.id;
    this.formData = {
      client_id: meeting.client_id,
      topic: meeting.topic,
      number_of_people: meeting.number_of_people,
      start_time: meeting.start_time ? meeting.start_time.slice(0, 16) : '',
      description: meeting.description
    };
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.editMode && this.selectedMeetingId) {
      this.meetingService.updateMeeting(this.selectedMeetingId, this.formData).subscribe({
        next: () => { this.showMessage('Meeting updated.', false); this.showForm = false; this.loadMeetings(); },
        error: (err) => { this.showMessage(err.error?.message || 'Update failed.', true); }
      });
    } else {
      this.meetingService.scheduleMeeting(this.formData).subscribe({
        next: () => { this.showMessage('Meeting scheduled.', false); this.showForm = false; this.loadMeetings(); },
        error: (err) => { this.showMessage(err.error?.message || 'Schedule failed.', true); }
      });
    }
  }

  deleteMeeting(id: number): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeeting(id).subscribe({
        next: () => { this.showMessage('Meeting deleted.', false); this.loadMeetings(); },
        error: () => { this.showMessage('Delete failed.', true); }
      });
    }
  }

  cancel(): void { this.showForm = false; }

  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => { this.message = ''; }, 3000);
  }
}
