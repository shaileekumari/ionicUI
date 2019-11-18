import { Component, OnInit } from '@angular/core';

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
  constructor() { 
    this.currentColor = 'light';
  }

  ngOnInit() {
  }
  changeToDarkColor() {
    // this.currentColor = 'dark';
    // this.currentColor=this.currentColor;
    console.log(this.currentColor);
    
} 

}
