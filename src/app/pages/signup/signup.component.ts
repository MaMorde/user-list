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
  public error: string;

  public ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.pattern(`^[\\w@.+-]+$`),
        ],
      ],
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(150)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$`),
        ],
      ],
    });
  }

  public signupUser(user: IUser): void {
    const newUser: IUser = {
      ...user,
      last_login: new Date().toISOString(),
      is_active: true,
    };
    this.authService.singUp(newUser).subscribe(
      (data) => {
        {
          this.authService
            .authorization(newUser.username, newUser.password)
            .subscribe((token) => {
              localStorage.setItem('token', JSON.stringify(token));
              this.router.navigate(['/userlist']);
              this.authService.setAuthUser(data);
            });
        }
      },
      (err) => {
        if (err.error.username) {
          this.error = 'username';
        }
      }
    );
  }

  public submit() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this.signupUser(this.signupForm.value);
    }
  }
}
