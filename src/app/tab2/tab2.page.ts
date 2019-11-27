import { Component } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectedLanguage:string;
  constructor(
   private as:AuthService
  ) {}

  register(form) {
    console.log(form);
    form.value.address='';
    console.log(form.value);
    this.as.register(form.value)
    .subscribe(
      res=>{
        console.log(res);
        console.log("Registered Successfully");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success...',
          text: 'Registered Successfully',
          showConfirmButton: false,
          timer: 2000
        })
       
        window.location.replace('tabs/tab1');
        
        
      }
    )
    
  }

}
