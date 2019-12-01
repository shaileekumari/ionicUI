import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private currentColor: string
  editProfile:boolean=false;
  visibleSidebar2;
  userBlockData;
  constructor(private ps:ProfileService) { 
    this.currentColor = 'light';
    this.editProfile=false;
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

  user_details;
  cropTypeList=["food","fiber","feed","oil","ornamental","industrial"]
 
  ngOnInit() {

    this.user_details=JSON.parse(sessionStorage.getItem("userData"));
    console.log(this.user_details);
    
    this.userData=this.user_details;
    this.userData['fullname']=this.userData['firstName']+" "+this.userData['lastName'];
    this.userData['farms']=[];
    this.userData['account_details']=[];
    if(this.userData['email']==""){
      this.userData['email']="--";
    }
    if(this.userData['address']==""){
      this.userData['address']="--";
    }
  this.editProfile=false;
  }


  updateProfile(){
    this.fetchUserDataByUserID()
    this.editProfile=true;
  }

  updatefarm(form){
  console.log(form.value);
  form.value.id="farmer"+this.userData['phoneNo'];
  form.value.farmId="farm"+this.userData['phoneNo'];
  this.ps.updateUser(form.value)
  .subscribe(
    res=>{
      console.log(res);
      this.editProfile=false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success...',
        text: 'Farmer Data has been updated successfully',
        showConfirmButton: false,
        timer: 2000
      })
      
    },err=>{
      this.editProfile=false;
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


  saveUserBlockainData(){
    let userString=sessionStorage.getItem("userData");
    let userD=JSON.parse(userString);
    console.log(userD);
    
    this.ps.saveUserBlockainData(userD)
    .subscribe(
      res=>{
        console.log(res);
        if(res.success==true){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success...',
            text: 'Farmer Account has been Registerd successfully in Blockchain',
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
    this.ps.fetchUserDataByUserID("farmer"+userD.phoneNo)
    .subscribe(
      res=>{
        console.log(res);
        this.userBlockData=res;

        
      },
      err=>{
        console.log(err);
        
      }
    )
  }
}
