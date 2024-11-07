import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin-components/admin/admin.component';

const routes: Routes = [
  
  {
    path: 'home',
    component: AdminComponent
  },
  {
    path: 'analysis-tool',
    loadChildren: () => import('../../modules/amazon-product/amazon-product.module').then(m => m.AmazonProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
