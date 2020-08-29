import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private authService: AuthService) {}

  users: Observable<IUser[]>;

  ngOnInit(): void {
    this.users = this.authService.getUsers();
  }
}
