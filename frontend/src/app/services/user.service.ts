import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, retry } from 'rxjs';
import UserModel from '../models/user.model';
import { PaymentType } from '../enums/subscription.enum';
import { AuthService } from './auth.service';
import { IUpdateCurrentUser } from '../interfaces/updateCurrentUser.interface';
import { IpdateCurrentEmail } from '../interfaces/updateCurrentEmail.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // variable d'environnement qui se trouve dans environment.ts
  private api = environment.api;
  token!: string;
  userId!: string;
  isAuth$ = new BehaviorSubject<boolean>(false);

  headers: any = {
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers() {
    return this.http.get<UserModel[]>(this.api + '/users', {
      headers: this.headers,
    });
  }

  deleteUserById(id: string) {
    const token = this.authService.getToken();
    this.headers.authorization = 'Bearer ' + token;
    return this.http.delete(this.api + '/users/' + id, {
      headers: this.headers,
    });
  }

  forgetPassword(email: string) {
    return this.http.post(this.api + '/users/forgetPassword', {
      email: email,
      headers: this.headers,
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(this.api + '/users/resetPassword', {
      token: token,
      password: password,
      headers: this.headers,
    });
  }

  updateCurrentEmail(email: IpdateCurrentEmail) {
    const headers = {
      ...this.headers,
      authorization: `Bearer ${this.authService.getToken()}`,
    };

    console.log('headers of pdate user:', headers);
    return this.http.put(this.api + '/users/updateEmail', email, {
      headers,
    });
  }

  updateCurrentUser(user: IUpdateCurrentUser) {
    const headers = {
      ...this.headers,
      authorization: `Bearer ${this.authService.getToken()}`,
    };

    console.log('headers of pdate user:', headers);
    return this.http.post(this.api + '/users/updateCurrentUser', user, {
      headers,
    });
  }

  updateCurrentPassword(password: Object) {
    const headers = {
      ...this.headers,
      authorization: `Bearer ${this.authService.getToken()}`,
    };
    return this.http.put(this.api + '/users/updatePassword', password, {
      headers,
    });
  }

  getUserById(id: string) {
    return this.http.get<UserModel>(this.api + '/users/' + id, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  deleteUser() {
    const token = this.authService.getToken();
    this.headers.authorization = 'Bearer ' + token;
    this.authService.logout();
    return this.http.delete(this.api + '/users/deleteUser/me', {
      headers: this.headers,
    });
  }

  uploadImage(image: File) {
    console.log('UPLOADING USER IMAGE ->', image);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('dataTest', 'x');

    console.log(
      'uploading IMAGE, api url endpoint is->',
      this.api + '/users/uploadImage'
    );

    return this.http.post(this.api + '/users/uploadImage', formData, {
      headers: {
        // ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
}
