import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { NgXCookies } from 'ngx-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    token: any;
    UserLoginDetails: any;
    public me: any;
    user : any = '';
    has_error: boolean = false;
    has_login_error: boolean = false;
    userloginError : any;
    f_name: string = '';
    l_name: string = '';
    u_name: string = '';
    pass: string = '';

    public alerts: any = [];

    public add(): void {
        this.alerts.push({
            type: 'Success',
            msg: '',
            timeout: 2000
        });
    }

    constructor( private loginService: LoginService,
                 private router: Router,

               ) {}

    ngOnInit() {
  }

    sendUserCredentials(username: string, password: string){
        this.loginService.loginData(username, password).subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeError(err)
        );
    }

    public register(fn: string, ln: string, un: string, ps: string){
        this.loginService.UserRegistration(fn, ln, un, ps).subscribe(
            data => this.handleRegistrationResponse(data),
            err => this.handleRegistrationError(err )
        );
    }

    private handleRegistrationResponse(response: any){
        this.has_error = false;
        this.add();
        this.f_name = '';
        this.l_name = '';
        this.u_name = '';
        this.pass = '';
        console.log('Registration Response =>', response);
    }

    private handleRegistrationError(err: any){
        this.user = JSON.parse(err._body);
        this.has_error = true;
        console.log('Registration Error=>', this.user);
    }
    private handleMeResponse(response: any){
        console.log('Login Response => ', JSON.parse(response._body).token);
        this.token = JSON.parse(response._body).token;

        localStorage.setItem('Detail_cookie', response._body);
        console.log('Detail Cookie => ', localStorage.getItem('Detail_cookie'));

        NgXCookies.setCookie('login_cookie',this.token, 1, 'hours');
        console.log('login_cookie => ',NgXCookies.getCookie('login_cookie'));
        this.router.navigate(['/account']);
    }

    private handleMeError(err: any){
        console.log(err._body);
        this.userloginError = err._body.split(':')[1].slice(2,err._body.split(':')[1].indexOf('.'));
        console.log('userLoginError =>', this.userloginError);
        console.log(err._body.split(':')[1].slice(2,err._body.split(':')[1].indexOf('.')));
        this.has_login_error = true;
    }

}
