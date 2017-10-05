import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class FormDetailService {

    constructor( private http: Http) { }
//    url = "http://127.0.0.1:8000/form/";
    url = "https://dj-raj.herokuapp.com/form/";

    getFormData(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url,options).map((res: Response) => this.handleMeResponse(res)).catch((err: Response) => this.handleMeError(err));
    }

    getFormDataById(id : any): Observable<any> {
        console.log('id under Form Service', id);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + id,options).map((res: Response) => this.handleMeResponse(res)).catch((err: Response) => this.handleMeError(err));
    }

    submitData(email: any, name: string, quali: any, gen: any, id: any): Observable<any>{
        console.log('id in submitData', id);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(this.url + id +'/',{ email: email, name: name, qualification: quali, gender: gen },options).map((res: Response) => this.handleMeResponse(res)).catch((err: Response) => this.handleMeError(err));
    }

        private handleMeResponse(res:Response) {
            console.log('res in form-detail', res.json());
            return res.json();
    }

    private handleMeError(err: Response) {
        console.log('err in form-detail service', err)
        return Observable.throw(err);
    }
}
