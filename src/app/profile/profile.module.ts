import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ProfilePage } from './profile.page';
import { TranslateModule } from '@ngx-translate/core';
import {MaterialModule} from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    TranslateModule.forChild(),
    MaterialModule
    
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
