import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'analysis-tool',
    loadChildren: () => import('../../modules/amazon-product/amazon-product.module').then(m => m.AmazonProductModule),
  },
  {
    path: 'automation-management',
    loadChildren:() => import('../../modules/automation-management/automation-management.module').then(m=> m.AutomationManagementModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
