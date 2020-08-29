import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  public hide = true;
  public username: string;
  public password: string;
  public loginUsernameControl: FormControl;
  public loginPasswordControl: FormControl;
  users: IUser[];

  public ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.loginUsernameControl = new FormControl('', [Validators.required]);
    this.loginPasswordControl = new FormControl('', [Validators.required]);
    this.authService.getUsers().subscribe((data) => (this.users = data));
    this.authService.getUsers().subscribe((data) => console.log(data));
  }

  public loginIn(): void {
    console.log(this.users);
    let userFound = false;
    for (let i = 0; i <= this.users.length - 1; i++) {
      if (this.users[i].username === this.username.trim()) {
        userFound = true;
        console.log(userFound);
        this.username = this.password = '';
        this.router.navigate(['/userlist']);
        break;
      }
    }
    if (userFound === false) {
      alert(
        'Логин и пароль не совпадают. Возможно аккаунт не зарегистрирован.'
      );
    }
  }
}
