import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {conf} from '../config';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getUserById():Observable<any>{
    console.log("inside service service" ,conf.URL);
    return this.http.get('assets/icon/user.json')
    .pipe(map(data=>{
      console.log("user cal");
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

    saveUserBlockainData(userData){
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8',
    
        
        }),
        };
        let email;
        if(userData.email==""){
          email="NONE";
        }else{
          email=userData.email;
        }
        let body={
        fcn:"registerUser",
        args:["farmer"+userData.phoneNo,"Farmer",userData.firstName+userData.lastName,email,userData.phoneNo+""]
        }

        return this.http.post<any>(conf.URL+'channels/mychannel/chaincodes/usercc2',body,httpOptions )
        .pipe(map(res => {
            console.log(res); 
            
            return res;
        }),
      tap(event=>{},this.handleErrorObservable)
    );
    }

    fetchUserDataByUserID(userId){
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8',
    
        
        }),
        };
        let id=[];
        id[0]=userId;
      let data= {peer:"peer1.org1.example.com",fcn:"fetchUserDataByUserID", args:JSON.stringify([userId])};
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


    updateUser(data){
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8',
    
        
        }),
        };
    
        let body={
        fcn:"updateProfile",
        args:[data.id,data.farmId,data.farmAddress,
          data.coordinates,data.cropName,data.cropType,
          data.cropSeason,data.cropState,
          data.accountNo+"",
          data.bankName,data.homeAddress]
        }

        return this.http.post<any>(conf.URL+'channels/mychannel/chaincodes/usercc2',body,httpOptions )
        .pipe(map(res => {
            console.log(res); 
            
            return res;
        }),
      tap(event=>{},this.handleErrorObservable)
    );
    }

    getCoordinates(address){
    
        const httpOptions = {
          headers: new HttpHeaders({
          'Content-Type': 'Application/json; charset=UTF-8',
      
          
          }),
          };
         
        
          let body={
            farmAddress:address
          }
          return this.http.post<any>(conf.URL+'getCoordinatesByAddress',body,httpOptions )
          .pipe(map(res => {
              console.log(res); 
              
              return res;
          }),
        tap(event=>{},this.handleErrorObservable)
      );
      }
 

}
