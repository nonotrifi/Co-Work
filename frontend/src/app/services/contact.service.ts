import {Injectable, OnInit} from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from "d3";




@Injectable({
  providedIn: 'root'
})

export class ContactService {


  private api = "https://MailThis.to/trifinourdine@outlook.fr"

  constructor(private http: HttpClient) {}





}
