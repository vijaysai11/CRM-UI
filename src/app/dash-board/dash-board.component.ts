import { Component, OnInit } from '@angular/core';
import { EmailFormComponent } from '../email-form/email-form.component';
import { EmailService } from '../email-service.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [EmailFormComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit {
  emailsCount!:number;
  contactsCount!:number;
  emailsList:any;
  contactsList:any;
  constructor(private emailService:EmailService) {}

  ngOnInit(): void {
    this.getContacts()
    this.getEmails()
  }
  getEmails(){
    this.emailService.getEmails().subscribe(
      (response) => {
        if(response)
{
  this.emailsList=response
  this.emailsCount = this.emailsList.length;
      
}      },
      (error) => {
        // console.error('Error sending email:', error);
      }
    )
  
  }
  getContacts(){
    this.emailService.getContacts().subscribe(
      (response) => {
        if(response)
{
      this.contactsList=response;
      this.contactsCount=this.contactsList.length;
}      },
      (error) => {
        // console.error('Error sending email:', error);
      }
    )
  
  }
}
