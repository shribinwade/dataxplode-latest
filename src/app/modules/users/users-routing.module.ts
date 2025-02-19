import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { ValuationComponent } from './components/valuation/valuation/valuation.component';
import { UserSearchHistoryComponent } from './components/user-search-history/user-search-history.component';

const routes: Routes = [

  {
    path: 'Report',
    component: UserReportComponent,
    data:{
      reuse: true
    }
  },
  {
    path: 'search-history', // Ensure this is defined under 'user' if needed
    component: UserSearchHistoryComponent,
    pathMatch: 'full',

  },
  {
   path: 'profiles',
   loadChildren:() => import('../../modules/user-profile/user-profile.module').then(m=> m.UserProfileModule),
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
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
