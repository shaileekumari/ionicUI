import { Component, OnInit } from '@angular/core';

import {InsurerService} from './insurer.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.page.html',
  styleUrls: ['./insurer.page.scss'],
})
export class InsurerPage implements OnInit {

  display:boolean=false;
  editProfile:boolean=false;
  userData={
    "user_id":"",
    "user_type":"",
    "fullname":"",
    "farms":[],
    "account_details":[{
        "account_number":"",
        "balance":"",
        "bank_name":""

    }]
  }

  each_policy={
    "policy_id":"","farmer_id":"","status":"","start_date":"","expiry_dates":"",
    "amount_insured":"","farm_data":{"address":"","geo_coordinates":{"longitude":"","latitude":""}},
    "crop_data":{"Crop_name":"","Crop_type":"","Crop_season":""}};
  policy_details=[{
    "policy_id":"","farmer_id":"","status":"","start_date":"","expiry_dates":"",
    "amount_insured":"","farm_data":{"address":"","geo_coordinates":{"longitude":"","latitude":""}},
    "crop_data":{"Crop_name":"","Crop_type":"","Crop_season":""}}]
    policydata;
  constructor(private ins:InsurerService, private as:AuthService) { }

  ngOnInit() {
    this.getInsuranceClaims();
  }
 getInsuranceClaims(){
  console.log("Inside Dashboard");
  this.display = false;
  this.ins.getInsuranceClaims().subscribe(
    res=>{
      this.policydata=res;
    },
    err=>{

    }
  )
 }
 openCard(policy){
  console.log(policy);
  this.display = true;
  this.each_policy=policy;
}
seletedTabClick(a){
  console.log(a);
  if(a.index==0){
    this.getInsuranceClaims();
  }else if(a.index==1){
    console.log("Display Profile");
    this.profile();
  }
  
}
profile(){
  this.editProfile=false;
  this.ins.getInsurerProfile().subscribe(
    res=>{
      this.userData=res;
    },
    err=>{
      
    }
  )
}
acceptClaim(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Success...',
    text: 'Insurance Claim Request has been accepted successfully',
    showConfirmButton: false,
    timer: 2000
  })
  this.display=false;
}

logout(){
  this.as.logout();
  window.location.replace('/')
}
}
