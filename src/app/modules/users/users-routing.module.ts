import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { ValuationComponent } from './components/valuation/valuation/valuation.component';

const routes: Routes = [

  {
    path: 'home',
    component: UserReportComponent
  },
  {
    path: 'analysis-tool',
    loadChildren: () => import('../../modules/amazon-product/amazon-product.module').then(m => m.AmazonProductModule),
  },
  {
    path: 'automation-management',
    loadChildren:() => import('../../modules/automation-management/automation-management.module').then(m=> m.AutomationManagementModule),
  },
  {
    path: 'valuation',
    component: ValuationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
