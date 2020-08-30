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
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(150)]],
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
      is_active: true,
    };
    console.log(newUser);
    this.authService
      .singUp(newUser)
      .subscribe(() => this.router.navigate(['/userlist']));
  }

  public submit() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this.signupUser(this.signupForm.value);
    }
  }
}
