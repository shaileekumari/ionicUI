import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
   
  },
  {
    path: 'farmer',
    loadChildren: () => import('./farmer/farmer.module').then( m => m.FarmerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insurer',
    loadChildren: () => import('./insurer/insurer.module').then( m => m.InsurerPageModule),
    canActivate: [AuthGuard]
  },

 

 

 


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
