import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomationManagementRoutingModule } from './automation-management-routing.module';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProductSearchTableComponent } from './components/data-management/child-components/product-search-table/product-search-table.component';
import { KeywordSearchTableComponent } from './components/data-management/child-components/keyword-search-table/keyword-search-table.component';
import { LocationComponent } from './components/data-management/child-components/location/location.component';
import { ReviewSearchTableComponent } from './components/data-management/child-components/review-search-table/review-search-table.component';


@NgModule({
  declarations: [
    DataManagementComponent,
    ProductSearchTableComponent,
    KeywordSearchTableComponent,

    LocationComponent,
      ReviewSearchTableComponent,
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
