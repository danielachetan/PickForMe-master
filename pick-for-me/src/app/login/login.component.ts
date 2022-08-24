import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isRegister: boolean = false;
  loginDetails: any = {
    'userName': '',
    'password': ''
  };

  registerDetails: any = {
    'userName': '',
    'password': '',
    'confirmPassword': ''
  };

  constructor(public angularFireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  signIn() {
    this.angularFireAuth
      .signInWithEmailAndPassword(this.loginDetails.userName, this.loginDetails.password)
      .then(res => {
        this.toastr.success('User Logged In Successfully', 'Success');
        console.log(res);
        this.loginService.userLoggedInData = res.user?.email;
        let email: string = res.user?.email || '';
        localStorage.setItem('userLoggedInData', email);
        this.router.navigateByUrl('/home')
      })
      .catch(err => {
        this.toastr.error('Invalid Credintials provided', 'Error');
        console.log('Something went wrong:', err.message);
      });
  }

  register() {
    if (this.registerDetails.confirmPassword == this.registerDetails.password) {
      if (this.registerDetails.password.length >= 6) {
        this.angularFireAuth.createUserWithEmailAndPassword(this.registerDetails.userName, this.registerDetails.password).then(res => {
          this.toastr.success('User Registered Successfully', 'Success');
          console.log(res);
          this.loginService.userLoggedInData = res.user?.email;
          // this.router.navigateByUrl('/lo')
          this.isRegister = false;
        })
          .catch(err => {
            this.toastr.error('Error in creating User Registration', 'Error');
            console.log('Something went wrong:', err.message);
          });
      } else {
        this.toastr.error('Password length should be more than 6 characters', 'Error');
      }

    } else {
      this.toastr.error('Password and Confirm Password should match', 'Error');
    }
  }

  switchTo(value: string) {
    if (value == 'Login') {
      this.isRegister = false;
    } else if (value == 'Register') {
      this.isRegister = true;
    }
  }
}
