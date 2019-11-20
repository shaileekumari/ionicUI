import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsurerPage } from './insurer.page';

const routes: Routes = [
  {
    path: '',
    component: InsurerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsurerPageRoutingModule {}
