import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementComponent } from './components/data-management/data-management.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomationManagementRoutingModule { }
