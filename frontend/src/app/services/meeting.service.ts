import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id?: number;
  meeting_topic: string;
  number_of_people: number;
  start_time: string;
  end_time?: string;
  client_id?: number;
  status?: string;
  client_name?: string;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private apiUrl = 'http://localhost:3000/api/meetings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl);
  }

  getById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  create(meeting: Meeting): Observable<any> {
    return this.http.post(this.apiUrl, meeting);
  }

  update(id: number, meeting: Meeting): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, meeting);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
