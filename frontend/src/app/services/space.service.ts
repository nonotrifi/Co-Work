import { Injectable, OnInit } from '@angular/core';
import SpaceModel from '../models/space.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISpace } from 'src/app/interfaces/space.interface';

import { AuthService } from './auth.service';

// service doit être enregistrer à la racine de l'application
@Injectable({
  providedIn: 'root',
})
export default class SpaceService {
  urlSpaceAPI: string = 'http://localhost:3000';
  spaceTab!: SpaceModel[];
  headers: any = {
    'Content-Type': 'application/json',
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // observable ca retourne un objet d'attente

  getAllSpaces() {
    return this.httpClient.get<SpaceModel[]>(this.urlSpaceAPI + '/spaces', {
      headers: this.headers,
    });
  }

  getSpaceById(id: string) {
    return this.httpClient.get<SpaceModel>(`${this.urlSpaceAPI}/spaces/${id}`, {
      headers: this.headers,
    });
  }

  create(space: FormData) {
    return this.httpClient.post<ISpace>(`${this.urlSpaceAPI}/spaces`, space, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  sendReservation(id: string, reservation: any) {
    return this.httpClient.post<any>(
      `${this.urlSpaceAPI}/spaces/reservation/${id}`,
      reservation,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  //

  deleteSpaceById(id: string) {
    console.log('in delete headers => ', this.headers);

    console.log('deleteSpacerById', this.urlSpaceAPI, id);
    const token = this.authService.getToken();
    console.log('token getToekn function => ', token);

    this.headers.authorization = `Bearer ${token}`;
    return this.httpClient.delete<any>(`${this.urlSpaceAPI}/spaces/${id}`,  {
      headers: this.headers,
    });
  }

  getTop() {
    return this.httpClient.get<any>(`${this.urlSpaceAPI}/spaces/top`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  // spacesById(spacesId: number): void{
  //   const space = this.spaceTab.find(space => space.id === spacesId);
  //   if(space){
  //   }
  // }
}
