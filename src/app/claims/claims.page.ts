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

  insFile='';
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
uploadFile($event){
  let reader = new FileReader();
  var file=$event.target.files[0];
  reader.readAsDataURL(file);
  // console.log(file,reader,file.name,(<string>reader.result).split(',')[1]);
  
  var formdata=new FormData();
  var h='';
  
  // formdata.append('fileName',file.name);
  //   formdata.append('fileData',(<string>reader.result).split(',')[1]);
  reader.onload = () => {
    console.log(reader.result);
    h=(<string>reader.result).split(',')[1];
    console.log(h,file.name);
    

    formdata.append('fileName',file.name);
    formdata.append('fileData',(<string>reader.result).split(',')[1]); // file data as string
    console.log(formdata.getAll('fileData'));

}
// console.log(formdata.getAll('fileName'),h);


}
}
