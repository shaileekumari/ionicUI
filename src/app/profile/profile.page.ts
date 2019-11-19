import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private currentColor: string
  editProfile:boolean=false;
  constructor(private ps:ProfileService) { 
    this.currentColor = 'light';
  }


  changeToDarkColor() {
    this.currentColor = 'dark';
} 

  userData={
    "user_id":"",
    "user_type":"",
    "fullname":"",
    "farms":[{
        "farm_id":"",
        "address":"",
        "coordinates":[0,1]
    }],
    "account_details":[{
        "account_number":"",
        "balance":"",
        "bank_name":""

    }]
  }

  farmer={
    name:'A',
    email:'abc@gmail.com',
    phone:'23456787565',
    address:'Bangalore,India',
    farm:{
      farm1:['4 acres','Bangalore, India'],
      farm2:['2 acres','Bangalore, India']
    }
   
  }
  farmlist;
  farms;
 
  ngOnInit() {
    this.farmlist=Object.keys(this.farmer.farm);
    console.log(this.farmlist);
    
  
  this.farms=this.farmer.farm;
  this.userProfile();
  }

  userProfile(){
    this.ps.getUserById()
    .subscribe(
      res=>{
        console.log(res);
        this.userData=res;
        
      },err=>{

      }
    )
  }
  updateProfile(){
    this.editProfile=true;
  }

  updatefarm(form){
  console.log(form.value);
  this.editProfile=false;
    
  }
  updateAccount(form){
    console.log(form.value);
    this.editProfile=false;
  }
}
