import { Component, OnInit,SecurityContext } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';

import { UserService } from './user.service';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgXCookies } from 'ngx-cookies';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    details: any = [];
    f_name: string;
    l_name: string;
    b_name: string;
    result: any;
    has_error: boolean;
    hideModal: boolean = false;
    err_body: string;
    user : any = '';
    inputData : any;
    editEnable: any;
    loginData: any;

    public inactive:boolean = false;

    public alerts: any = [];

    public add(): void {
        this.alerts.push({
            type: 'success',
            msg: '',
            timeout: 2000
        });
    }

    constructor( private userService : UserService,
                 private router: Router,
                 private appService: AppService,

               ) { }

    ngOnInit(){
        console.log('NGX => ', NgXCookies.getCookie('login_cookie'));
//        if (!NgXCookies.exists('login_cookie'))
//        this.router.navigate(['/user/']);
        this.receieveDefaultData();
        this.loginData = JSON.parse(localStorage.getItem('Detail_cookie'));
        console.log('login data in user =>',this.loginData);
    }

    public save(fn : string, ln: string, br: string) {
        this.userService.saveData(fn,ln,br).subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeError(err)
        );
     }

    public edit(id: string, fn: string, ln: string, br: string){
        console.log('edit() id is' + id);
        this.userService.updateData(id,fn,ln,br).subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeError(err)
        );
        this.receieveDefaultData();

    }

    changeStatus(){
        this.inactive = true;
    }
    private handleMeResponse(response: any){
        this.result = response;
        this.inputData = {};
        this.data();
        this.add();
        this.changeStatus();
        return console.log(this.result);
    }

    private handleMeError(err: any){
        this.has_error = true;
        this.user = JSON.parse(err._body);

        console.log("i m under error");
    }

    public routeById(id: string){
        console.log('id is ' + id);
        this.router.navigate(['./account/' + id]);
    }

  public navigateToAccount(){
        console.log('i m under navigateToAccount() ');
        this.router.navigate(['./account/']);
    }
    public receieveDefaultData(){
        console.log("Under recieveDefaultData" + this.appService.getDefaultData());
        this.inputData = this.appService.getDefaultData();
        console.log('inputData is: ' + (Object.keys(this.inputData).length === 0));
        this.editEnable = (Object.keys(this.inputData).length === 0)
        this.data();
    }

    public data(){
        this.f_name = this.inputData.first_name;
        this.l_name = this.inputData.last_name;
        this.b_name = this.inputData.branch;
    }

    public logout(){
        this.appService.logout();
    }

}