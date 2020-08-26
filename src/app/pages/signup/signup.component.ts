import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  public hide = true;
  public users: IUser[];
  public signupForm: FormGroup;

  public ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(1),
        ],
      ],
      firstname: ['', Validators.required, Validators.maxLength(30)],
      lastname: ['', Validators.required, Validators.maxLength(150)],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(128),
          Validators.minLength(1),
        ],
      ],
    });
  }

  public signupUser(user: IUser): void {
    const newUser: IUser = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      is_active: false,
      last_login: new Date(),
      is_superuser: false,
    };

    let chekUserName = false;
    if (this.users) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].username.toLowerCase() !==
          newUser.username.trim().toLowerCase()
        ) {
          chekUserName = false;
        } else {
          chekUserName = true;
        }
      }
    } else {
      chekUserName = false;
    }

    if (chekUserName === true) {
      alert('Такое имя уже использовано, введите другое!');
      return;
    } else {
      this.router.navigate(['/userlist']);
    }
  }
  consoles() {
    this.authService.getUsers().subscribe((data) => console.log(data));
  }
  public submit() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this.signupUser(this.signupForm.value);
    }
  }
}
