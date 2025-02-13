import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewComponent } from './components/review/review.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { ReadMoreDirective } from './directives/ReadMore/read-more.directive';
import { ToolTipDirective } from './directives/Tooltip/tooltip.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogModelComponent } from './components/custom-dialog-model;/dialog-model/dialog-model.component';
import { BcgMatrixChartComponent } from './components/BCG-dialog-model/bcg-matrix-chart/bcg-matrix-chart.component';
import { SwotAnalysisComponent } from './components/SwoatAnalysis/swot-analysis/swot-analysis.component';
import { ReviewAnalysisChartComponent } from './components/chart-components/review-analysis-chart/review-analysis-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ReviewBarChartComponent } from './components/review-analysis-bar-chart/review-bar-chart/review-bar-chart.component';
import { FormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { routes } from '../app-routing.module';
import { HomeComponent } from './components/LandingPage/home/home.component';


@NgModule({
  declarations: [
    CustomSnackBarComponent,
    StarRatingComponent,
    ReviewComponent,
    ProductReviewComponent,
    ReadMoreDirective,
    ToolTipDirective,
    DialogModelComponent,
    BcgMatrixChartComponent,
    SwotAnalysisComponent,
    ReviewAnalysisChartComponent,
    ReviewBarChartComponent,
    HomeComponent
 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    NgChartsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    RouterModule

  
  ],

  exports: [
    DialogModelComponent,
    ReadMoreDirective,
    ToolTipDirective,
    StarRatingComponent,
    MaterialModule,
    ReviewComponent, 
    ReviewAnalysisChartComponent ,
    NgChartsModule,
    NgxMaterialTimepickerModule,
    RouterModule

  ]
})
export class SharedModule { }
