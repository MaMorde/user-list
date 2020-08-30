import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private link = 'http://emphasoft-test-assignment.herokuapp.com';
  private account = {
    username: 'test_super',
    password: 'Nf<U4f<rDbtDxAPn',
  };
  private headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e',
    'X-CSRFToken':
      'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI',
  });

  authorization() {
    return this.http.post(`${this.link}/api-token-auth/`, this.account);
  }
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.link}/api/v1/users/`, {
      headers: this.headers,
    });
  }
  singUp(user: IUser) {
    return this.http.post<IUser>(
      `${this.link}/api/v1/users`,
      { data: user },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
