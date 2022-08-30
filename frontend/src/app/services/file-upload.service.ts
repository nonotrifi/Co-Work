import {Injectable, OnInit} from "@angular/core";
import EventModel from "../models/event.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileService {


  headers = {
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient) {}


  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
    .post(endpoint, formData, { headers: this.headers })
    .pipe (
       map(() => { return true; })
      //  RTCError((e) => this.handleError(e))
     );


}
}
