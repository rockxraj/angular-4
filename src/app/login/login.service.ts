import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class LoginService {

    constructor( private http: Http ) { }

    url = "http://127.0.0.1:8000/";

    loginData(user: string, pass: string){

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

         return this.http.post(this.url + 'login/', { username: user, password: pass }, options);
    }

    UserRegistration(fn: string, ln: string, un: string, ps: string){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + 'register/', { first_name: fn, last_name: ln, username: un, password: ps }, options);
    }

}
