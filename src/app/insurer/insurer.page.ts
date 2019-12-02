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


  user_details;
  display:boolean=false;
  editProfile:boolean=false;
  showUser;
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
  showUpdate:boolean=false;
  each_policy;
  policy_details;
    policydata;
  constructor(private ins:InsurerService, private as:AuthService) { }

  ngOnInit() {
    this.each_policy={
      "amount_insured":"","policy_status":"","start_date":"","expiry_dates":"",
      "farm_id":"","farmer_id":"","insurer_id":"","policy_id":"",
      "claim":[{"claimId": "","claimStatus": "","claimedAmount": 0,"createdOn": "","processedOn": "",}]
      };
  this.policy_details=[{
      "Key":"",
      "Record":{
      "amount_insured":"","policy_status":"","start_date":"","expiry_dates":"",
      "farm_id":"","farmer_id":"","insurer_id":"","policy_id":"",
      "claim":[{"claimId": "","claimStatus": "","claimedAmount": 0,"createdOn": "","processedOn": "",}]
      }}];
    this.user_details=JSON.parse(sessionStorage.getItem("userData"));
    this.getInsuranceClaims();
    // this.saveUserBlockainData();
  }
 getInsuranceClaims(){
  
 
  console.log("Inside Dashboard");
  this.display = false;
  this.ins.fetchAllInsurance("insurer"+this.user_details.phoneNo).subscribe(
    res=>{
      this.policy_details=res;
      console.log(this.policy_details);
      
    },
    err=>{

    }
  )
 }
 openCard(policy){
  console.log(policy);
  this.each_policy=policy.Record;
  this.display = true;
  
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
  this.user_details=JSON.parse(sessionStorage.getItem("userData"));
  console.log(this.user_details);
  this.userData=this.user_details;
  this.userData['fullName']=this.user_details['firstName']+" "+this.user_details['lastName'];
  this.editProfile=false;
  // this.ins.getInsurerProfile().subscribe(
  //   res=>{
  //     this.userData=res;
  //   },
  //   err=>{
      
  //   }
  // )
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

saveUserBlockainData(){
  let userString=sessionStorage.getItem("userData");
  let userD=JSON.parse(userString);
  console.log(userD);
  
  this.ins.saveUserBlockainData(userD)
  .subscribe(
    res=>{
      console.log(res);
      if(res.success==true){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success...',
          text: 'Insurer Account has been Registerd successfully in Blockchain',
          showConfirmButton: false,
          timer: 2000
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Already Registered',
          text: res.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    err=>{
      console.log(err);
      
    }
  )
}


fetchUserDataByUserID(){
  let userString=sessionStorage.getItem("userData");
  let userD=JSON.parse(userString);
  console.log(userD);
  this.ins.fetchUserDataByUserID("insurer"+userD.phoneNo)
  .subscribe(
    res=>{
      console.log(res);
      this.showUser=res;
      this.showUpdate=!this.showUpdate;
      
      
    },
    err=>{
      console.log(err);
      
    }
  )
}

update(form){
  console.log(form.value);
  form.value.id="insurer"+this.user_details['phoneNo'];
  this.ins.updateInsurer(form.value).subscribe(
    res=>{
      console.log(res);
      this.editProfile=false;
    },
    err=>{
      console.log(err);
      
    }
  )
}

updatePolicy(id,status){
  console.log(id,status);
  
  this.ins.updatePolicy(id,status).subscribe(
    res=>{
      console.log(res);
      if(res.success){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success...',
          text: 'Insurance Claim Request has been Updated successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.display=false;
      }
      
    },err=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error...',
        text: 'Something Went Wrong',
        showConfirmButton: false,
        timer: 2000
      })
      
      console.log(err);
      
    }
  )
}
}
