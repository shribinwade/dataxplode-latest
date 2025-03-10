import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementComponent } from './components/data-management/data-management.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementComponent,
    data:{
      reuse: true
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomationManagementRoutingModule { }
