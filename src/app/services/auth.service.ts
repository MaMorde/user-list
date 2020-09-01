import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.currentUser.subscribe((user) => {
      this.authUser = user;
    });
  }
  public currentUser: Subject<IUser> = new Subject();
  private link = 'http://emphasoft-test-assignment.herokuapp.com';
  private authUser: IUser;
  private headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e',
    'X-CSRFToken':
      'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI',
  });

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
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.link}/api/v1/users/`, {
      headers: this.headers,
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
    this.currentUser.next(null);
    return this.http.put(
      `${this.link}/api/v1/users/${this.authUser.id}/`,
      (this.authUser.is_active = false),
      {
        headers: {
          Authorization: `Token ${this.getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
