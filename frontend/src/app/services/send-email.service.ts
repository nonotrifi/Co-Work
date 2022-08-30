import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {IContact} from '../interfaces/contact.interface'


@Injectable({
  providedIn: 'root',
})


export class SendEmailService {


  private api = environment.api;


  headers = {
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient){

  }

 sendEmailContact(contact: IContact ){
  return this.http.post<IContact>(`${this.api}/sendmailPost`, contact, {
    headers: this.headers,
  }  )
 }
}
