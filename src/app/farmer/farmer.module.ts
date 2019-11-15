import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerPageRoutingModule } from './farmer-routing.module';

import { FarmerPage } from './farmer.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FarmerPage]
})
export class FarmerPageModule {}
