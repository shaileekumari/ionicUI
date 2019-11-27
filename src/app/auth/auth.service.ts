import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {User} from './user';
import {conf} from '../config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(username: string,orgName:string) {
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'Application/json; charset=UTF-8',

    
    }),
    };
  let body={ "username":username,"orgName":orgName};
  let data=JSON.stringify(body);
  return this.http.post<any>(conf.URL+'users',data,httpOptions )
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          console.log(user,"ok")
          if (user && user.token) {
            console.log("inside token Service")
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }
          console.log("inside Auth Service")

          return user;
      }),
    tap(event=>{},this.handleErrorObservable)
  );
}
private handleErrorObservable (error: HttpErrorResponse) {
  console.error(error.message || error);
  console.log("inside error",error);
  return error;
  }

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  
}

getUserByLogin(body){
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'Application/json; charset=UTF-8',

    
    }),
    };

   
    return this.http.post<any>(conf.URL+'login',body,httpOptions )
        .pipe(map(user => {
            console.log(user);
            
            return user;
        }),
      tap(event=>{},this.handleErrorObservable)
    );

}

register(user){
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'Application/json; charset=UTF-8',

    
    }),
    };

   

    return this.http.post<any>(conf.URL+'add_users',user,httpOptions )
        .pipe(map(user => {
            console.log(user); // { "id": "5dde107442edc31ccf015de5"}
            
            return user;
        }),
      tap(event=>{},this.handleErrorObservable)
    );
}

forgotPassword(user){
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'Application/json; charset=UTF-8',

    
    }),
    };

   

    return this.http.post<any>(conf.URL+'forgot',user,httpOptions )
        .pipe(map(user => {
            console.log(user); 
            
            return user;
        }),
      tap(event=>{},this.handleErrorObservable)
    );
}
}
