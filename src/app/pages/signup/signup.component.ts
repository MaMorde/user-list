import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
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
          Validators.pattern('^[w.@+-]+$'),
        ],
      ],
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(150)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern('^(?=.*[A-Z])(?=.*d).{8,}$'),
        ],
      ],
    });
  }

  public signupUser(user: IUser): void {
    const newUser: IUser = {
      ...user,
      last_login: new Date().toString(),
      is_active: true,
    };
    this.authService.singUp(newUser).subscribe(() => {
      {
        this.authService
          .authorization(newUser.username, newUser.password)
          .subscribe((token) => {
            localStorage.setItem('token', JSON.stringify(token));
            this.router.navigate(['/userlist']);
          });
        this.authService.setAuthUser(newUser);
      }
    });
  }

  public submit() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this.signupUser(this.signupForm.value);
    }
  }
}
