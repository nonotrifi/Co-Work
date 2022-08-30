import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, retry } from 'rxjs';
import UserModel from '../models/user.model';
import { PaymentType } from '../enums/subscription.enum';


type GetCurrentUserResponse = {
  _doc: UserModel;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // variable d'environnement qui se trouve dans environment.ts
  private api = environment.api;
  token!: string;
  userId!: string;
  isAuth$ = new BehaviorSubject<boolean>(false);

  headers = {
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    if (this.token !== '') {
      this.isAuth$.next(true);
    }
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  isAuth() {
    return this.isAuth$.asObservable();
  }

  getAuth() {
    return this.isAuth$.getValue();
  }

  async hasPayment(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      const res = await this.http
        .get(this.api + '/users/hasPayment', { headers })
        .toPromise();
      console.log(res);
      return !!res;
    }
    return false;
  }

  getPaymentType() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
    return this.http.get<PaymentType>(this.api + '/users/getPaymentType', {
      headers: headers,
    });
  }

  async isAdmin() {
    const token = localStorage.getItem('token');
    // console.log('isAdmin token: ', token);

    try {
      if (token) {
        const headers = new HttpHeaders().set(
          'Authorization',
          'Bearer ' + token
        );
        const res = await this.http
          .get<boolean>(this.api + '/users/isAdmin', { headers }) // users/:id /users >> getByEmail > return un user unique > check le role
          .toPromise();

        console.log('res === ', res);
        // convert undefined or null to false for boolean
        return !!res;
      }
      return false;
    } catch (e) {
      console.log('e === ', e);
      return false;
    }
  }

  async isClient() {
    const token = localStorage.getItem('token');
    console.log('token isClient: ', token)
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const res = await this.http
        .get<boolean>(this.api + '/users/isClient', { headers })
        .toPromise();
      return res;
    }
    return false;
  }

  signUp(user: UserModel) {
    return this.http.post<string>(this.api + '/users/signup', user, {
      headers: this.headers,
    });
  }

  login(email: string, password: string) {
    return this.http.post<string>(
      this.api + '/users/signin',
      { email, password },
      {
        headers: this.headers,
      }
    );
  }

  setToken(token: string) {
    this.token = token;
    this.isAuth$.next(true);
    localStorage.setItem('token', token);
  }

  // signIn(email: string, password: string){
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.api+'/users/login', {email: email, password: password}).subscribe(
  //       (authData: {token: string, userId: string}) => {
  //           this.token = authData.token;
  //           this.userId = authData.userId;
  //           this.isAuth$.next(true);
  //       },
  //       (err)=> {
  //         reject(err)
  //       }
  //     )
  //   })
  // }

  logout() {
    this.isAuth$.next(false);
    this.userId = null || '';
    this.token = null || '';

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', '');
    }
  }

  getAllUsers() {
    return this.http.get<UserModel[]>(this.api + '/users', {
      headers: this.headers,
    });
  }

  getUser() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return this.http.get<GetCurrentUserResponse>(this.api + '/users/getUser/me', {
      headers: headers,
    });
  }
}
