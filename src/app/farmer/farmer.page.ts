import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.page.html',
  styleUrls: ['./farmer.page.scss'],
})
export class FarmerPage implements OnInit {

n;
  constructor(private as:AuthService,private router:Router) { }

  ngOnInit() {
  }




  showNotifications(){
    this.n=1;
  }

  logout(){
    this.as.logout();
    window.location.replace('/')
  }

}
