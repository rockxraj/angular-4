import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class FormService {

    constructor( private http: Http) { }
    url = "http://127.0.0.1:8000/form/";

    formData(email: string, name: string, quali: string, gender: string, licen: boolean){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url,{email:email, name: name, qualification: quali, gender: gender, licen: licen },options);
    }
}
