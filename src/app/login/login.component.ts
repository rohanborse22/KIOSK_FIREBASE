import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'firebaseLogin';
 
  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;
  pagetitle: string='Sign-in';
  type: string;
 
  constructor(
    private authService: AuthenticationService,
    private titleService: Title,
    private router: Router
  ) {
    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
    this.pagetitle=this.titleService.getTitle();
  }

  ngOnInit() {
  }

  
  // Comman Method to Show Message and Hide after 2 seconds
  showMessage(type, msg) {
    if (type == "success") {
      this.type = "success";
    }
    else{
      this.type = "failed";
    }
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }
 
  // Called on switching Login/ Register tabs
  public onValChange(val: string) {
    this.showMessage("", "");
    this.selectedVal = val;
    if(this.selectedVal == 'login'){
      this.setTitle("Sign-in");
    }
    else{
      this.setTitle("Sign-up");
    }
  }
 
  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.router.navigate(['/home']);
    this.userDetails = this.authService.isUserLoggedIn();
  }
 
  // SignOut Firebase Session and Clean LocalStorage
  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Login user with  provided Email/ Password
  loginUser() {
    this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In!");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Register user with  provided Email/ Password
  registerUser() {
    this.authService.register(this.emailInput, this.passwordInput)
      .then(res => {
 
        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Registration Successful! Please Verify Your Email");
        }, err => {
          this.showMessage("danger", err.message);
        });
        this.isUserLoggedIn();
 
 
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Send link on given email to reset password
  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage("success", "Please Check Your Email");
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Open Popup to Login with Google Account
  googleLogin() {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In with Google");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 

}
