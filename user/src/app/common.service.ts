import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import{Observable}  from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
@Injectable()
export class CommonService {

  constructor(private http: Http) { }
  createCourses(url, data): Observable<any> {

    return this.http.post(url, data )
      .map(res => res.json());
  }
    CreateContact(url,data):Observable<any>{
      return this.http.post(url,data)
       .map(response => {
        console.log(response);
        response.json()
      });
    }
}
