import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class UserService {

    constructor( private http: Http) { }

    url = "http://127.0.0.1:8000/account/";

    getData(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url);
    }

    saveData(fn : string, ln: string, br: string): any {
       let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie')  });
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.url,{ first_name:fn, last_name: ln, branch: br }, options);

    }

    updateData(id : string, fn: string, ln: string, br: string){
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie')  });
      let options = new RequestOptions({ headers: headers });
        console.log("i m in updateData");
        return this.http.put(this.url + id + '/', { first_name: fn, last_name: ln, branch: br }, options);
    }

    deleteData(id: string) {
        console.log(id);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' +  NgXCookies.getCookie('login_cookie') });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + id, options);
    }
}
