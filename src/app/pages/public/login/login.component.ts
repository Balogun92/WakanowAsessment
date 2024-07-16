import { Component, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../../core/services/login-service.service';
import { UserServiceService } from '../../../core/services/users/user-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showLoginForm: boolean = false;
  showSignupForm: boolean = true;
  loginForm: FormGroup | any;
  signUpForm: FormGroup | any;
  hide = signal(true);
  loginResponse!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private apiService: UserServiceService,
    private _snackBar: MatSnackBar
  ){}


  ngOnInit(): void{
    this.generateLogin();
    this.generateSignUpForm();
  }


  generateLogin():void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  generateSignUpForm():void{
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })

  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  onClickLogin(){
    this.showSignupForm= false;
    this.showLoginForm = true;
  }

  login(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value
    const success = this.apiService.login(email, password);
    this.loginResponse = success ? 'Login successful' : 'Login failed';
    if(this.loginResponse === 'Login successful'){
      this.openSnackBar('Login successful');
      this.router.navigate(['/users'])
    }else{
      this.openSnackBar('Invalid Login Details')
    }
  }

  signUp() {
    const payload = {
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      role: 'User',
      status: 'Pending'
    };

    const success = this.apiService.addUser(payload);
    this.loginResponse = success ? 'Sign Up successful, please await admin approval' : 'Sign Up failed';

    if (success) {
      this.openSnackBar('Sign Up successful');
      localStorage.setItem('newUser', JSON.stringify(payload));
    } else {
      this.openSnackBar('Sign Up failed');
    }
  }



  openSnackBar(response: any) {
    this._snackBar.open(response, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}

