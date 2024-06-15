import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { EmailService } from '../email-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emails-table',
  standalone: true,
  imports: [NgxPaginationModule,NgIf, NgFor, DatePipe],
  templateUrl: './emails-table.component.html',
  styleUrl: './emails-table.component.css'
})
export class EmailsTableComponent {
  emailDataForm!: FormGroup;
  count:number =0;
  sentMailsList:any=[]
  limit:number=0;
  pageNo:number=0;
  showPopup:string="none";
  contactId:any;
 

  constructor(private emailService:EmailService) {}
  ngOnInit(): void {
    this.emailDataForm = new FormGroup({
      to: new FormControl(''),
      subject: new FormControl(''),
      body: new FormControl(''),
      contactStatus:new FormControl(''),
    });
    this.getEmails();
  }
  getEmails(){
    this.emailService.getEmails().subscribe(
      (response) => {
        if(response)
{
      this.sentMailsList=response;
      this.count=this.sentMailsList.length;
}      },
      (error) => {
        console.error('Error sending email:', error);
        alert('Error sending email. Please try again.');
      }
    )
  
  }

  sendEmail(): void {
    let emailData = {
      recipient: this.emailDataForm.get('to')?.value,
      subject: this.emailDataForm.get('subject')?.value,
      body: this.emailDataForm.get('body')?.value,
      contactStatus:this.emailDataForm.get('contactStatus')?.value
    };
    
    console.log(emailData)

    this.emailService.sendEmail(emailData,this.contactId).subscribe(
      (response) => {
        if(response)
        alert(response);
      },
      (error) => {
        console.error('Error sending email:', error);
        alert('Error sending email. Please try again.');
      }
    )
  }
  onCloseModel(){
    this.showPopup="none";
  }
  openToReply(contactId:number){
    this.showPopup="block";
  }
}
