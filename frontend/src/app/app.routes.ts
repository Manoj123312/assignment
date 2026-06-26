import { Routes } from '@angular/router';
import { ClientListComponent }    from './components/client-list/client-list.component';
import { ClientCreateComponent }  from './components/client-create/client-create.component';
import { ClientEditComponent }    from './components/client-edit/client-edit.component';
import { MeetingListComponent }   from './components/meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MeetingEditComponent }   from './components/meeting-edit/meeting-edit.component';

export const routes: Routes = [
  { path: '',              redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients',       component: ClientListComponent },
  { path: 'clients/new',   component: ClientCreateComponent },
  { path: 'clients/:id/edit', component: ClientEditComponent },
  { path: 'meetings',      component: MeetingListComponent },
  { path: 'meetings/new',  component: MeetingCreateComponent },
  { path: 'meetings/:id/edit', component: MeetingEditComponent },
  { path: '**',            redirectTo: 'clients' }
];
