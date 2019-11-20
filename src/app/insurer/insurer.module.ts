import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsurerPageRoutingModule } from './insurer-routing.module';

import { InsurerPage } from './insurer.page';
import {MaterialModule} from '../material.module';

import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsurerPageRoutingModule,
    MatSliderModule,
    MaterialModule
  ],
  declarations: [InsurerPage]
})
export class InsurerPageModule {}
