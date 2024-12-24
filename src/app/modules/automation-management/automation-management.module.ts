import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomationManagementRoutingModule } from './automation-management-routing.module';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProductSearchTableComponent } from './components/data-management/child-components/product-search-table/product-search-table.component';
import { KeywordSearchTableComponent } from './components/data-management/child-components/keyword-search-table/keyword-search-table.component';
import { DistributedSearchTableComponent } from './components/data-management/child-components/distributed-search-table/distributed-search-table.component';
import { CompetitorSearchTableComponent } from './components/data-management/child-components/competitor-search-table/competitor-search-table.component';
import { LocationComponent } from './components/data-management/child-components/location/location.component';


@NgModule({
  declarations: [
    DataManagementComponent,
    ProductSearchTableComponent,
    KeywordSearchTableComponent,
    DistributedSearchTableComponent,
    CompetitorSearchTableComponent,
    LocationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AutomationManagementRoutingModule,
 
  ]
})
export class AutomationManagementModule { }
