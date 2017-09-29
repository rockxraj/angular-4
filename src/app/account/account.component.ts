import { Component, OnInit, Output,EventEmitter, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { AccountService } from './account.service';
import { LoginComponent } from '../login/login.component';
import { AppService } from '../app.service';
 import { NgXCookies } from 'ngx-cookies';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ LoginComponent ]
})

export class AccountComponent implements OnInit {
    details: any = [];
    f_name: string;
    l_name: string;
    b_name: string;
    result: any;
    err_body: string;
    user :any;
    deleteRecordId: string;
    page_num: string = '1';
    totalCount: string;
    searchNotFound: boolean = false;
    inactive : boolean = false;
    loginData: any;

   // tItem = new Config();

    //sorting
    key: string = 'first_name'; //set default
    reverse: boolean = false;
    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    public alerts: any = [];

    public add(): void {
        this.alerts.push({
            type: 'danger',
            msg: '',
            timeout: 2000
        });
    }

    constructor( private accountService : AccountService,
                 private router: Router,
                 private appService : AppService,
                 public  loginComponent : LoginComponent
               ) { }

    ngOnInit() {
        this.getServiceData();
        if ( !NgXCookies.exists('login_cookie'))
            this.router.navigate(['/login']);
        this.loginData = JSON.parse(localStorage.getItem('Detail_cookie'));
        console.log('login data in account =>',this.loginData);
    }

    public getServiceData(){
        this.accountService.getData(this.page_num).subscribe((res: Response) => {
            this.details = res.json();
            this.totalCount = res.json().count;
            console.log("I am Under getServiceData() => ",res.json());
        });
    }

    public logout(){
        this.appService.logout();
        //this.router.navigate(['']);
    }

    public setPageNumber(event: string){
        this.page_num = event;
        this.getServiceData();
        console.log('I am in setPageNumber =>' + event);
        return this.page_num;
    }

    public getSearchData(name : string){
        this.accountService.searchData(name).subscribe(
            data => this.handleSearchResponse(data),
            err => this.handleSearchError(err)
        );
    }

    public handleSearchResponse(res: any) {
        this.searchNotFound = false;
        this.details = res.json().results;
        this.totalCount = res.json().count;

        if(this.details.length != 0)
            console.log('getSearchData() =>',this.details);
        else{
            this.searchNotFound = true;
            console.log('Search Not Found');
        }
    }

    public handleSearchError(err : any){
        console.log(err);
    }

    public sendData(data: any){
        console.log('sendData(): ' + data);
        this.appService.setDefaultData(data);
    }

    public delete_record(id: string){
                this.accountService.deleteData(id).subscribe(
                data => this.handleMeResponse(data),
                err => this.handleMeError(err)
            );
    }

    public setId(id: string){
        this.deleteRecordId = id;
    }

    private handleMeResponse(response: any){
        this.result = response;
        this.add();
        setInterval(' window.location.reload()', 500);
        return console.log(this.result);
    }

    private handleMeError(err: any){
        this.user = JSON.parse(err._body);
        console.log("i m under error");
    }

    public navigateToUser(){
        console.log('I m under User Url ' );
        this.router.navigate(['./user/']);
    }

    public navigateToUserById(id: string){
        console.log('i am under navigateToUserById');
        this.router.navigate(['./user/' + id ]);
    }
}
