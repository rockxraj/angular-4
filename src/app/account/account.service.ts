import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class AccountService {
    resultData: any;
    constructor( private http: Http) { }

    url = "http://127.0.0.1:8000/account/";

    searchData(name: string){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + "?search=" + name);
    }
    getData(num : string){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.headers.append('Authorization', 'Bearer ' + NgXCookies.getCookie('login_cookie'));
        return this.http.get(this.url + "?page=" + num, options);
    }

    updateData(id : string, fn: string, ln: string, br: string){
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie')  });
      let options = new RequestOptions({ headers: headers });
        console.log("i m in updateData");
        return this.http.put(this.url + id + '/', { first_name: fn, last_name: ln, branch: br }, options);
    }

    deleteData(id: string) {
        console.log(id);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie')  });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + id, options);
    }

}
