import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';

/*import {MatSidenavModule,MdDialogRef,MdSnackBar,MatRadioModule,MatInputModule,MdDialog,MD_DIALOG_DATA,MatButtonModule,MatIconModule,MatGridListModule,MatDialogModule,MatTableModule,MatSelectModule, MdSnackBarConfig, MdSnackBarRef} from '@angular/material';*/

import{MdDialogRef, MdDialog, MdSnackBar, MD_DIALOG_DATA, MdSnackBarConfig, MdSnackBarRef} from '@angular/material';

import { FormDetailService } from './form-detail.service';
import 'rxjs/add/observable/of';


@Component({
    selector: 'app-form-detail',
    templateUrl: './form-detail.component.html',
    styleUrls: ['./form-detail.component.css']
})


export class FormDetailComponent implements OnInit {
    displayedColumns = ['email', 'name', 'qualification', 'gender','actions'];
    data: any = [{email: "rajendra.j@amazatic.com", name: "Raj", qualification: "B.E.", gender: "Male"}];
    dialogRef: any;
    config: any = new MdSnackBarConfig();

    constructor( private formDetailService: FormDetailService,
                 private dialog: MdDialog,
                 private snackBar: MdSnackBar){}

    dataSource: ExampleDataSource | null;

    ngOnInit(){
        this.getData();
    }

    edit(id: any){
        console.log('id is =>', id);
        this.getDataByID(id);
    }

    getDataByID(id: any){
        this.formDetailService.getFormDataById(id).subscribe(
            data => this.handleResponseById(data),
            err => this.handleMeResponse(err)
        );
    }

    getData(){
        this.formDetailService.getFormData().subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeResponse(err)
        );

    }

    private handleResponseById(response: any){
        console.log('Form Detail response =>', response);
        this.dialogRef = this.dialog.open(DialogDataExampleDialog, {
            data: {
                data:response,
                service: this.formDetailService,
                snackBar: this.snackBar
            }
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.getData();
            console.log('result is', result);
        });
    }

    private handleMeResponse(response: any){
        console.log('Form Detail response =>', response);
//        this.quali_data = response.qualification;
//        console.log('Form Detail response =>', );

        this.dataSource = new ExampleDataSource(response);
    }

    private handleMeError(err: any){
        console.log('Form Detail err =>', err);
    }

}

export interface Element {
    id: any;
    name: string;
    email: any;
    qualification: any;
    gender: string;
}



export class ExampleDataSource extends DataSource<any>  {
    data: any = [];
    setData: any;

    constructor( data : any ){
        super();
        this.data = data;
        console.log('Data is =>',this.data);
    }

    connect(): Observable<any> {
        return Observable.of(this.data);
    }

    disconnect() {}
}
@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data.html',
//    styles: ['.mat-select-arrow { font-size : 14px;}']
})
export class DialogDataExampleDialog {
    formData: any;
    gender: string;
    formDetailService: any;
    snackBarRef: MdSnackBarRef<any>;
    snackBar: any;
    has_error: boolean = false;
    quali_error: any ={};
    default_quali = 'MCA';
    qualis: any = [ {key: 'MCA', name: 'MCA'},
                    {key: 'MBA', name: 'MBA'},
                    {key: 'B.E.', name:'B.E.'},
                  ];

    constructor(public dialogRef: MdDialogRef<DialogDataExampleDialog>,
                @Inject(MD_DIALOG_DATA) public data: any) {
        this.formData = data;
        this.formDetailService = this.formData.service;
        this.snackBar = this.formData.snackBar;
        this.gender = this.formData.data.gender;
        console.log('Data in constructor =>', this.formData.data);
        console.log('Detail in constructor =>', this.formData.service);
        console.log('Gender in constructor =>', this.gender);
    }

    close(){
        console.log('i m under close');
        this.dialogRef.close();
    }

    submit(em: any, nm: string, quali: any, gen: any){
        console.log('Email =>', em);
        console.log('Name =>', nm);
        console.log('Qualil =>', quali);
        console.log('Gender =>', gen);

        this.formDetailService.submitData(em, nm, quali, gen, this.formData.data.id).subscribe(
            data => this.handleMeResponse(data),
            err => this.handleMeError(err)
        );
    }

    private handleMeResponse(res: any){
        console.log('sucessfully edited =>', res);
        this.close();

        this.snackBarRef = this.snackBar.open('Successfully edited');
        setTimeout(()=>{
            this.snackBarRef.dismiss();
        },2000);
    }

    private handleMeError(err: any){
        this.has_error = true;
        this.quali_error = JSON.parse(err._body);
        console.log('err in material edit =>',JSON.parse(err._body));
    }
}