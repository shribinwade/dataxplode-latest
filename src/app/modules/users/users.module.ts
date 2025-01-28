import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValuationComponent } from './components/valuation/valuation/valuation.component';
import { BerkusMethodComponent } from './components/valuation/valuation/child-components/berkus-method/berkus-method.component';
import { DiscountedCashflowComponent } from './components/valuation/valuation/child-components/discounted-cashflow/discounted-cashflow.component';
import { VentureCapitalMethodComponent } from './components/valuation/valuation/child-components/venture-capital-method/venture-capital-method.component';
import { EarningMultiplierMethodComponent } from './components/valuation/valuation/child-components/earning-multiplier-method/earning-multiplier-method.component';
import { PaynescoreMethodComponent } from './components/valuation/valuation/child-components/paynescore-method/paynescore-method.component';
import { RiskSummationFactorComponent } from './components/valuation/valuation/child-components/risk-summation-factor/risk-summation-factor.component';
import { StartupsMethodComponent } from './components/valuation/valuation/child-components/startups-method/startups-method.component';
import { SummarizedValuationComponent } from './components/valuation/valuation/child-components/summarized-valuation/summarized-valuation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserReportComponent,
    ValuationComponent,
    BerkusMethodComponent,
    DiscountedCashflowComponent,
    VentureCapitalMethodComponent,
    EarningMultiplierMethodComponent,
    PaynescoreMethodComponent,
    RiskSummationFactorComponent,
    StartupsMethodComponent,
    SummarizedValuationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
