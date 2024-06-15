import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailFormComponent } from './email-form/email-form.component';
import { AddContactComponent } from './add-contact/add-contact.component';

const routes: Routes = [
  {
    path: '',
    component: AddContactComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
  {

  path:'/contacts',
  component:EmailFormComponent
},
{
  path:'/add-contact',
  component:AddContactComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
