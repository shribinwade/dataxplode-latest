import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UserReportComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
