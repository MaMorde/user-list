import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  public hide = true;
  public username: string;
  public password: string;
  public signinForm: FormGroup;
  users: IUser[];

  public ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.authService.getUsers().subscribe((data) => (this.users = data));
    this.authService.getUsers().subscribe((data) => console.log(data));
  }

  public signIn(): void {
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
  public submit() {
    if (this.signinForm.invalid) {
      return;
    } else {
      this.signIn();
    }
  }
}
