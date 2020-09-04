import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private authService: AuthService) {}

  users: IUser[];
  query: string;
  ngOnInit(): void {
    this.authService.getUsers().subscribe((users) => (this.users = users));
  }
}
