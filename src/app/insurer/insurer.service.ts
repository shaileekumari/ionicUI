import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {conf} from '../config';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {

  constructor(private http:HttpClient) { }
  getInsuranceClaims():Observable<any>{
    console.log("inside service service" ,conf.URL);
    return this.http.get('assets/icon/farmdatas.json')
    .pipe(map(data=>{
      console.log("ins cal");
      return data;
      
    }),
    tap(event=>{},this.handleErrorObservable)
  )
  }

  getInsurerProfile():Observable<any>{
    console.log("inside service service" ,conf.URL);
    return this.http.get('assets/icon/insurer.json')
    .pipe(map(data=>{
      console.log("ins cal");
      return data;
      
    }),
    tap(event=>{},this.handleErrorObservable)
  )
  }

  private handleErrorObservable (error: HttpErrorResponse) {
    console.error(error.message || error);
    console.log("inside error",error);
    return error;
    }
}
