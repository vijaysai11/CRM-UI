import { Routes } from '@angular/router';
import { EmailFormComponent } from './email-form/email-form.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EmailsTableComponent } from './emails-table/emails-table.component';
import { DraftsComponent } from './drafts/drafts.component';

export const routes: Routes = [
    {
      path: '',
      component: DashBoardComponent,
    },
    {
        path: 'dashboard',
        component: DashBoardComponent,
      },
    {
  
    path:'contacts',
    component:EmailFormComponent
  },
  {
    path:'add-contact',
    component:AddContactComponent
  },
  {
    path:'emails',
    component:EmailsTableComponent
  },
  {
    path:'reply-to',
    component:EmailsTableComponent
  },
  {
    path:'drafts',
    component:DraftsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },];
