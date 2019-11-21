import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  each_policy={
    "policy_id":"","farmer_id":"","status":"","start_date":"","expiry_dates":"",
    "amount_insured":"","farm_data":{"address":"","geo_coordinates":{"longitude":"","latitude":""}},
    "crop_data":{"Crop_name":"","Crop_type":"","Crop_season":""}};
  policy_details=[{
    "policy_id":"","farmer_id":"","status":"","start_date":"","expiry_dates":"",
    "amount_insured":"","farm_data":{"address":"","geo_coordinates":{"longitude":"","latitude":""}},
    "crop_data":{"Crop_name":"","Crop_type":"","Crop_season":""}}]
    policydata;
  
  constructor(private dashboardService:DashboardService) {
    this.policydata=this.policy_details;
    this.display=false;
   }
   display: boolean = false;


  ngOnInit() {
    // this.dashboardService.getPolicyDetails();
    this.serviceCall();
  }
  serviceCall(){
    console.log("inside service");
    
    this.dashboardService.getPolicyDetails()
    .subscribe(
      res=>{
        console.log(res);
        this.policydata=res;
        
      },err=>{

      }
    )
  }
  openCard(policy){
    console.log(policy);
    this.display = true;
    this.each_policy=policy;
  }

}
