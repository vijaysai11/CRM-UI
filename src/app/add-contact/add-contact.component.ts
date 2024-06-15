import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { EmailService } from '../email-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  addContact!: FormGroup;
  statuses!:any;

  constructor(private emailService:EmailService) {}
  ngOnInit(): void {
    this.addContact = new FormGroup({
      name: new FormControl(''),
      emailId: new FormControl(''),
      status:new FormControl('NEW'),
    });
    this.addContact.get('status')?.disable()
    this.emailService.getStatuses().subscribe(
      data => {
        this.statuses = data;
        console.log(this.statuses);
      },
      error => {
        console.error('Error fetching statuses', error);
      }
    );
    this.addContact.get('website')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.checkWebsiteExists(value))
      )
      .subscribe(response => {
        if (response === 'URLEXISTS') {
          this.addContact.get('website')!.setErrors({ urlExists: true });
        } else {
          this.addContact.get('website')!.setErrors(null);
        }
      });
  }
  
  
  createContact(): void {
    let contact = {
      name: this.addContact.get('name')?.value,
      email: this.addContact.get('emailId')?.value,
      status: this.addContact.get('status')?.value
    };
    console.log(this.addContact.get('status')?.value)
    this.emailService.createContact(contact).subscribe(
      (response) => {
        if(response)
        alert(response);
      },
      (error) => {
        console.error('Error adding contact:', error);
        alert('Error adding contact. Please try again.');
      }
    )
    this.addContact.reset();
    this.addContact.get('status')?.setValue('NEW');

  }
 
}
