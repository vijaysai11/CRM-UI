import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmailFormComponent } from "./email-form/email-form.component";
import { AddContactComponent } from './add-contact/add-contact.component';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, EmailFormComponent,NgClass,AddContactComponent]
})
export class AppComponent  {
  title = 'mail-sender';
  status = false;
  addToggle() {
    this.status = !this.status;
  }
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  
}
