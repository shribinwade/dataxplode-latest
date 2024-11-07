import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketIntelligenceComponent } from './components/market-intelligence/market-intelligence.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'market-intelligence',
    pathMatch: 'full'
  },
  {
    path:'market-intelligence',
    component: MarketIntelligenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmazonProductRoutingModule { }
