import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {conf} from '../config';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http:HttpClient) { }
  getPolicyDetails():Observable<any>{

    console.log("inside service service",conf.URL);
    return this.http.get('assets/icon/farmdatas.json') //http.get(conf.URL)
    .pipe(map(data=>{
      console.log("network cal");
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


    fetchInsuranceByFarmerId(id){
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8',
    
        
        }),
        };
  
      let data= {peer:"peer1.org2.example.com",fcn:"fetchInsuranceByFarmerId", args:JSON.stringify([id])};
      console.log(data);
      
     
      return this.http.get<any>(conf.URL+'channels/mychannel/chaincodes/insuranceCC',
      {params:data})
      .pipe(map(res => {
        console.log(res); 
        
        return res;
    }),
  tap(event=>{},this.handleErrorObservable)
  );
    }
}
