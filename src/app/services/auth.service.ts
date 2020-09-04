import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.currentUser.subscribe((user) => {
      this.authUser = user;
    });
  }
  public errors = new Subject();
  public error;
  public currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private link = 'http://emphasoft-test-assignment.herokuapp.com';
  private authUser: IUser;

  authorization(username: string, password: string): Observable<object> {
    return this.http.post(
      `${this.link}/api-token-auth/`,
      {
        username,
        password,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  public setAuthUser(user: IUser) {
    this.currentUser.next(user);
  }
  public setErrors(err) {
    this.errors.next(err);
  }
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.link}/api/v1/users/`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${this.getToken().token}`,
        'X-CSRFToken':
          'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI',
      },
    });
  }
  singUp(user: IUser) {
    return this.http.post<IUser>(`${this.link}/api/v1/users/`, user, {
      headers: {
        Authorization: 'Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e',
        'Content-Type': 'application/json',
      },
    });
  }
  logout() {
    localStorage.setItem('token', JSON.stringify(null));
    this.currentUser.next(null);
  }
}
