import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeetingService, Meeting } from '../../services/meeting.service';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];
  errorMessage = '';

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void { this.loadMeetings(); }

  loadMeetings(): void {
    this.meetingService.getAll().subscribe({
      next: (data) => { this.meetings = data; },
      error: () => { this.errorMessage = 'Failed to load meetings. Is the backend running?'; }
    });
  }

  deleteMeeting(id: number): void {
    if (!confirm('Delete this meeting?')) return;
    this.meetingService.delete(id).subscribe({
      next: () => { this.meetings = this.meetings.filter(m => m.id !== id); },
      error: () => { this.errorMessage = 'Failed to delete meeting.'; }
    });
  }
}
