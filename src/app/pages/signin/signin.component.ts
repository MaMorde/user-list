import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { error } from 'protractor';

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
  public signinForm: FormGroup;
  users: IUser[];
  error: string;

  public ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public signIn(): void {
    this.authService
      .authorization(
        this.signinForm.get('username').value,
        this.signinForm.get('password').value
      )
      .subscribe(
        (token) => {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['/userlist']);
        },
        (err) => {
          if (err.error.non_field_errors) {
            this.error = 'fail';
          }
        }
      );
  }
  public submit() {
    if (this.signinForm.invalid) {
      return;
    } else {
      this.signIn();
    }
  }
}
