import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = 'http://localhost:8080/api'; // Change this to your backend URL

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any,contactId:number) {
    return this.http.post(`${this.baseUrl}/send-email/${contactId}`, emailData);
  }
  getContacts() {
    return this.http.get(`${this.baseUrl}/contacts`);
  }
  getEmails() {
    return this.http.get(`${this.baseUrl}/emails`);
  }
   createContact(contact:any) {
    return this.http.post(`${this.baseUrl}/add-contact`,contact);
  }
  getStatuses() {
    return this.http.get(`${this.baseUrl}/statuses`);
  }
  checkWebsiteExists(url: string): Observable<string> {
    return this.http.get<string>(`/api/check-url?url=${url}`);
  }
  
}

