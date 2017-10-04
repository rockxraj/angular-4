import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { AppService } from '../app.service';

import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MatCardModule, MatChipsModule} from '@angular/material';
import { NgXCookies } from 'ngx-cookies';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    genderValue: string = 'Male';
    licValue: boolean = false;
    has_error: boolean = false;
    errorData: any = '';
    licError: boolean = false;
    eml: string = '';
    nam: string = '';
    qul: any;
    loginData: any;

    public alerts: any = [];

    public add(): void {
        this.alerts.push({
            type: 'success',
            msg: '',
            timeout: 4000
        });
    }

    constructor( private router: Router,
                 private formService: FormService,
                 private appService: AppService,
               ) { }

    ngOnInit() {
        this.loginData = JSON.parse(localStorage.getItem('Detail_cookie'));
        console.log('under form data login name =>', this.loginData );
    }
    submitData( email: string, name: string, qual: string, gen: string, lic: any){
        console.log('email =>', email);
        console.log('name =>', name);
        console.log('quali =>', qual);
        console.log('gender =>', gen);
        console.log('lic =>', lic);

        this.formService.formData(email, name, qual, gen, lic).subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeError(err)
        );
    }


    private handleMeResponse(response: any){
        this.has_error = false;
        this.saveDefault();
        this.add();
        console.log('UserForm Response =>', response);

    }

    private saveDefault(){
        this.eml = '';
        this.nam = '';
        this.qul = [0];
        this.licValue = false;
    }
    private handleMeError(err: any){
        this.has_error = true;
        this.errorData = JSON.parse(err._body);
        console.log('UserForm Error =>', JSON.parse(err._body));
    }
    public logout(){
        this.appService.logout();
    }

}
