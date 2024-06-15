import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email-service.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { AngularEditorComponent } from "../angular-editor/angular-editor.component";

@Component({
    standalone: true,
    selector: 'app-email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css'],
    providers: [EmailService],
    imports: [FormsModule, ReactiveFormsModule, NgxPaginationModule, NgIf, NgFor, DatePipe, AngularEditorComponent]
})
export class EmailFormComponent implements OnInit {
  emailDataForm!: FormGroup;
  count:number =0;
  sentMailsList:any=[]
  limit:number=0;
  pageNo:number=0;
  showPopup:string="none";
  contactId:any;
 

  constructor(private emailService:EmailService) {}
  ngOnInit(): void {
    this.getContacts()
    this.emailDataForm = new FormGroup({
      to: new FormControl(''),
      subject: new FormControl(''),
      body: new FormControl(''),
      contactStatus:new FormControl(''),
    });
  }
  getContacts(){
    this.emailService.getContacts().subscribe(
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
    
    this.emailService.sendEmail(emailData,this.contactId).subscribe(
      (response) => {
        this.emailDataForm.reset();
        if(response==="Email sent successfully"){
          console.log("SUCCESS")
        }

      },
      (error) => {
        console.error('Error sending email:', error);
        alert('Error sending email. Please try again.');
      }
    )
    this.emailDataForm.reset();
    this.showPopup="none";
    this.getContacts();


  }
  onCloseModel(){
    this.showPopup="none";
  }
  openToReply(contact:any){
    this.emailDataForm.patchValue({
      to: contact.email,
      contactStatus:contact.status
    })
    this.emailDataForm.get('contactStatus')?.disable();

    this.contactId=contact.id
    this.showPopup="block";
  }
}
