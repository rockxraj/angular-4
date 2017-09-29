import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { NgXCookies } from 'ngx-cookies';
import { Router } from '@angular/router';

@Injectable()
export class AppService {
    globalData: any = {};

    constructor( private http: Http,
                 private router: Router) { }

    setDefaultData(data: any){
        this.globalData =  data;
    }

    getDefaultData(){
        return this.globalData;
    }

    public logout(){
        console.log('beforelogout cookie => ', NgXCookies.getCookie('login_cookie'));
        NgXCookies.deleteCookie('login_cookie');
        console.log('After logout cookie => ', NgXCookies.getCookie('login_cookie'));
        this.router.navigate(['']);
    }
}
