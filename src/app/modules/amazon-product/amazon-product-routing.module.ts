import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketIntelligenceComponent } from './components/market-intelligence/market-intelligence.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'market-intelligence',
    pathMatch: 'full',
    data:{
      reuse: true
     },
  },
  {
    path:'market-intelligence',
    component: MarketIntelligenceComponent,
    data:{
      reuse: true
     },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmazonProductRoutingModule { }
