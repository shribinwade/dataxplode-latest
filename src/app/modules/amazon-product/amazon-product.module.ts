import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmazonProductRoutingModule } from './amazon-product-routing.module';
import { MarketIntelligenceComponent } from './components/market-intelligence/market-intelligence.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchComponent } from './components/child-components/product-search/product-search.component';
import { KeywordSearchComponent } from './components/child-components/keyword-search/keyword-search.component';
import { MarketSearchComponent } from './components/child-components/market-search/market-search.component';
import { BulletpointsComponent } from './components/child-components/product-search/dialog-component/bulletpoints/bulletpoints.component';
import { SpecificationComponent } from './components/child-components/product-search/dialog-component/specification/specification.component';

import { ImportantInfoComponent } from './components/child-components/product-search/dialog-component/important-info/important-info.component';
import { KeywordReviewComponent } from './components/child-components/keyword-search/dialog-component/keyword-review/keyword-review.component';
import { TabControlComponent } from './components/child-components/market-search/child-components/tab-control/tab-control.component';
import { TabItemHeaderComponent } from './components/child-components/market-search/child-components/tab-control/child-component/tab-item-header/tab-item-header.component';
import { MarketTreadComponent } from './components/child-components/market-search/child-components/market-tread/market-tread.component';
import { MarketLeaderComponent } from './components/child-components/market-search/child-components/market-leader/market-leader.component';
import { InnovationComponent } from './components/child-components/market-search/child-components/innovation/innovation.component';
import { NewsSearchResultComponent } from './components/child-components/market-search/child-components/market-tread/child-component/news-search-result/news-search-result.component';
import { NewsComponent } from './components/child-components/market-search/child-components/market-tread/child-component/news/news.component';
import { DistributorSearchComponent } from './components/child-components/distributor-search/distributor-search/distributor-search.component';
import { CompetitiveStratergyComponent } from './components/child-components/competitive-stratergy/competitive-stratergy/competitive-stratergy.component';
import { CompetitorRivalsComponent } from './components/child-components/competitive-stratergy/child-components/competitor-rivals/competitor-rivals.component';
import { CustomerPowerComponent } from './components/child-components/competitive-stratergy/child-components/customer-power/customer-power.component';
import { NewEntrantsComponent } from './components/child-components/competitive-stratergy/child-components/new-entrants/new-entrants.component';
import { SupplierPowerComponent } from './components/child-components/competitive-stratergy/child-components/supplier-power/supplier-power.component';
import { ThreatOfSubtitutesComponent } from './components/child-components/competitive-stratergy/child-components/threat-of-subtitutes/threat-of-subtitutes.component';
import { CompetitorAnalysisComponent } from './components/child-components/competitor-analysis/competitor-analysis/competitor-analysis.component';
import { CompetitorAnalysisFinalComponent } from './components/child-components/competitive-analysis-table/competitor-analysis-final/competitor-analysis-final.component';


@NgModule({
  declarations: [
    MarketIntelligenceComponent,
    ProductSearchComponent,
    KeywordSearchComponent,
    MarketSearchComponent,
    BulletpointsComponent,
    SpecificationComponent,
    ImportantInfoComponent,
    KeywordReviewComponent,
    TabControlComponent,
    TabItemHeaderComponent,
    MarketTreadComponent,
    MarketLeaderComponent,
    InnovationComponent,
    NewsSearchResultComponent,
    NewsComponent,
    DistributorSearchComponent,
    CompetitiveStratergyComponent,
    CompetitorRivalsComponent,
    CustomerPowerComponent,
    NewEntrantsComponent,
    SupplierPowerComponent,
    ThreatOfSubtitutesComponent,
    CompetitorAnalysisComponent,
    CompetitorAnalysisFinalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  //image slider library
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AmazonProductRoutingModule,
    SharedModule
  ]
})
export class AmazonProductModule { }
