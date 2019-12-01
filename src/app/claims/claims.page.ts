import { Component, OnInit } from '@angular/core';
import {ClaimsService} from './claims.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-claims',
  templateUrl: './claims.page.html',
  styleUrls: ['./claims.page.scss'],
})
export class ClaimsPage implements OnInit {
  private currentColor: string
  private cColor:string='light';
  colrsKey=['light','dark','green','blue','red']
  colrsValues={
    'light':'light',
    'dark':'dark',
    'blue':'secondary',
    'red':'danger',
    'green':'success'
  }
  insurers;
  uploadTrue:boolean=false;
  insFile='';
  each_policy;
  farmerId='';
  user_details;
  farmId;
  constructor(private cs:ClaimsService) { 
    this.currentColor = 'light';
    this.each_policy={
      "provider":"SBI",
      "policy_id":"","farmer_id":"faman1","status":"","start_date":"1/11/2019","expiry_dates":"5/03/2020",
      "amount_insured":"20000","farm_data":{"address":"Bangalore","geo_coordinates":{"longitude":"12","latitude":"13"}},
      "crop_data":{"Crop_name":"Rice","Crop_type":"Cereal Grains","Crop_season":"Kharif","Crop_state":"Planting"}};
  }


  ngOnInit() {
    this.user_details=JSON.parse(sessionStorage.getItem("userData"));
   
    this.farmerId="farmer"+this.user_details.phoneNo;
    this.farmId="farm"+this.user_details.phoneNo;
    this.cs.fetchInsurers().subscribe(
      res=>{
        console.log(res);
        this.insurers=res;

      },
      err=>{
        console.log(err);
        
      }
    )
  }
  changeToDarkColor() {
    // this.currentColor = 'dark';
    // this.currentColor=this.currentColor;
    console.log(this.currentColor);
    
} 

createPolicy(form){
console.log(form.value);
this.cs.createPolicy(form.value).subscribe(
  res=>{
    console.log(res);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success...',
      text: 'Claim Created successfully',
      showConfirmButton: false,
      timer: 2000
    })
    window.location.replace('/farmer/dashboard')
  },
  err=>{
    console.log(err);
    
  }
)
}
// uploadFile($event){
//   let reader = new FileReader();
//   var file=$event.target.files[0];
//   reader.readAsDataURL(file);
//   // console.log(file,reader,file.name,(<string>reader.result).split(',')[1]);
  
//   var formdata=new FormData();
//   var h='';
  
//   // formdata.append('fileName',file.name);
//   //   formdata.append('fileData',(<string>reader.result).split(',')[1]);
//   reader.onload = () => {
//     console.log(reader.result);
//     h=(<string>reader.result).split(',')[1];
//     console.log(h,file.name);
    

//     formdata.append('fileName',file.name);
//     formdata.append('fileData',(<string>reader.result).split(',')[1]); // file data as string
//     console.log(formdata.getAll('fileData'));
//     this.uploadTrue=true;
// }
// // console.log(formdata.getAll('fileName'),h);


// }
}
