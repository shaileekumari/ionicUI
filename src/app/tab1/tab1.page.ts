import { Component } from '@angular/core';
import { TranslateConfigService } from '../translate-config.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  selectedLanguage:string;
  url:string='';
  forgot:boolean=false;

  constructor(private translateConfigService: TranslateConfigService,private route:Router,
    private authservice:AuthService) {}

  login(form){
    console.log(form.value);
    this.authservice.getUserByLogin(form.value).subscribe(
      res=>{
        console.log(res);
        if(res['error']){
          console.log("Inside Error",res['error']);
          
        }
        else{
          let userData=res;
          let org='';
         
          if(res['role']=='farmer'){
            org='Org1';
            this.url='farmer';
          } else if(res['role']=='insurer'){
            org='Org2';
            this.url='insurer';
          }
          this.authservice.login(userData['phoneNo']+"",org)
          .subscribe(data=>{
            console.log(data);
            if(data['success']==false){
              console.log("Error in token Generation, Invalid Value Type",data['message']);
              
            }else{
              sessionStorage.setItem("userData",JSON.stringify(res));
              this.route.navigate([this.url]);
            }
          },
        err=>{
          console.log(err);
          
        })
        }
        
      },
      err=>{
        alert("Something Went Wrong");
      }
    ) 
    
  }
  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  forgotPassword(form){
    console.log(form.value);
    this.authservice.forgotPassword(form.value)
    .subscribe(
      res=>{
        console.log(res);
        if(res['result']){
          console.log(res.result['error']);
          Swal.fire({
            icon:'error',
            text:"User Not Found",
            timer:3000
          })
          this.forgot=false;
        }
        else{
          
          Swal.fire({
            icon:'success',
            text:"Password Updated Successfully",
            timer: 2000
          })
          this.forgot=false;
        }
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }
  
}
