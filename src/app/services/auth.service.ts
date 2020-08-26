import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  link = 'http://emphasoft-test-assignment.herokuapp.com';
  getUsers() {
    return this.http.get(`${this.link}/api/v1/users/`);
  }
}
