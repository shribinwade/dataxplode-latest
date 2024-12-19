import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomationManagementRoutingModule } from './automation-management-routing.module';
import { DataManagementComponent } from './components/data-management/data-management.component';


@NgModule({
  declarations: [
    DataManagementComponent
  ],
  imports: [
    CommonModule,
    AutomationManagementRoutingModule
  ]
})
export class AutomationManagementModule { }
