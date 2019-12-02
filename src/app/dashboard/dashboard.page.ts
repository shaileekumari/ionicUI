import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


    policydata;
    policy_details;
    each_policy;
  
  constructor(private dashboardService:DashboardService) {
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
      }}]
    this.policydata=this.policy_details;
    this.display=false;
   }
   display: boolean = false;
   user_details;

  ngOnInit() {

    this.user_details=JSON.parse(sessionStorage.getItem("userData"));
   
    let farmerId="farmer"+this.user_details.phoneNo;
    this.dashboardService.fetchInsuranceByFarmerId(farmerId).subscribe(
      res=>{
        console.log(res);
        this.policy_details=res;
        
      },err=>{
        console.log(err);
        
      }
    )

    
  }

  openCard(policy){
    console.log(policy);
    this.display = true;
    this.each_policy=policy.Record;
  }

}
