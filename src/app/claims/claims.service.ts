import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {conf} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private http:HttpClient) { }

  fetchInsurers(){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'Application/json; charset=UTF-8',
  
      
      }),
      };

    let data= {peer:"peer1.org1.example.com",fcn:"fetchUserByType", args:JSON.stringify(['insurer'])};
    console.log(data);
    
   
    return this.http.get<any>(conf.URL+'channels/mychannel/chaincodes/usercc2',
    {params:data})
    .pipe(map(res => {
      console.log(res); 
      
      return res;
  }),
tap(event=>{},this.handleErrorObservable)
);
  }

  createPolicy(data){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'Application/json; charset=UTF-8',
  
      
      }),
      };
      let body={
        fcn:"newPolicy",
        args:[data.policyId,data.farmerId,data.farmId,
          data.insurerId,data.startDate,data.endDate,
          data.amount+""]
        }

        return this.http.post<any>(conf.URL+'channels/mychannel/chaincodes/insuranceCC2',body,httpOptions )
        .pipe(map(res => {
            console.log(res); 
            
            return res;
        }),
      tap(event=>{},this.handleErrorObservable)
    );

  }

  private handleErrorObservable (error: HttpErrorResponse) {
    console.error(error.message || error);
    console.log("inside error",error);
    return error;
    }
}
