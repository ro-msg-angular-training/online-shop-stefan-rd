import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserCredentials } from 'src/app/utils/user-credentials.util';
import { ValidationError } from 'src/app/utils/validation-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  ngOnDestroy(): void {
    if (!!this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  requiredStringValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationError | null => {
      const value = control.value;
      if (!!value) {
        return null;
      } else {
        return {
          invalidValue: {
            value: control.value,
            errorMessage: errorMessage,
          },
        };
      }
    };
  }

  goToHomePage(): void {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

  onLogin(): void {
    const userCredentials: UserCredentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    console.log(userCredentials);
    this.loginSubscription = this.authenticationService
      .loginUser(userCredentials)
      .subscribe(
        (user) => {
          this.goToHomePage();
          console.log(user);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.toastr.error(error.error.message, 'ERROR');
        }
      );
  }

  buildFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [this.requiredStringValidator('Username cannot be empty!')],
      ],
      password: ['', this.requiredStringValidator('Password cannot be empty!')],
    });
  }
}
