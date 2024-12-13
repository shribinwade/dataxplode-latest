import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductReviewComponent } from '../../../../../../shared/components/product-review/product-review.component';
import { SwotAnalysisComponent } from '../../../../../../shared/components/SwoatAnalysis/swot-analysis/swot-analysis.component';
import { ExportTableAsExcelService } from '../../../../../../core/services/excel-utils/export-table-as-excel.service';
import { AuthService } from '../../../../../../core/services/auth-service/auth.service';
import { SaveServiceDataService } from '../../../../../../core/services/SaveServicesData/save-service-data.service';
import { CustomSnackbarService } from '../../../../../../core/services/snackbar-service/custom-snackbar.service';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-competitor-analysis-final',
  templateUrl: './competitor-analysis-final.component.html',
  styleUrl: './competitor-analysis-final.component.scss'
})
export class CompetitorAnalysisFinalComponent implements OnInit {



  featureKeys:string[]=[];
  headers:string[]=['Features'];
  data:any[] = [];
  swotData:any [] = [];
  productvalues:any;

  isLoading:boolean = false;

  @Input('responseData') responseData:any;
  @Input('country') country!:String;
  @Input() formdata!:FormGroup;
  @Input() requestData!: any;

  private unsubscribe$ = new Subject<void>();
 
  constructor( private dialog: MatDialog,
               private  exportToExcelService:ExportTableAsExcelService,
               private authService:AuthService,
               private globalSnackbar: CustomSnackbarService,
               private UploadCompetitorAnalysisService:SaveServiceDataService){}

  ngOnInit(): void {
   
     // GETTING DATA FROM SERVICE 
    //  const formData = this.formDataService.getFormData();
     const searchData = this.responseData;
     const productValues =Object.values(searchData.Search_result);
     this.productvalues = productValues;
     this.featureKeys = Object.keys(searchData.Search_result[0]);
     this.featureKeys.push("More Info")
     const productKeys = Object.keys(searchData.Search_result);
     const mappedProductKeys = productKeys.map((key, index) => `product${String.fromCharCode(65 + index)}`);
     
 
      for(let data of mappedProductKeys){
       this.headers.push(data);
      }
 
      for(let value of productValues){
       this.data.push(value);
      }
      // const SearchDatajson =JSON.stringify(searchData.Search_result);
      console.log(this.responseData);
      this.swotData.unshift(this.responseData);
    
  }

  openReviewDialog(arg0: any) {
 
    const requestData = {
      country: this.country,
      productSearchQuery: arg0,
      keywordSearchQuery: "",
      marketSearchQuery: "",
      pincode: ""
    };
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = {formdata:requestData}
   
    this.dialog.open(ProductReviewComponent  , dialogConfig);
  }

  openSwotAnalysis(data:any) {
 
    console.log(JSON.stringify(data));
    this.swotData.unshift(JSON.stringify(data));
   
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    dialogConfig.data = this.swotData;
    dialogConfig.panelClass = 'swot-full-screen';
    // dialogConfig.data = { asinData };
    this.dialog.open(SwotAnalysisComponent, dialogConfig);
  }
  exportToExcel(){
    this.exportToExcelService.exportTableAsExcel(this.data,"competitor analysis List")
  }

  saveSearchData(){
    this.isLoading = true; // Start loading
    //To DO
    //1.getUser ID
    const userId = this.authService.getUserInfo()?.id;
    //2.get Country
    let country = this.requestData.country;
    //3.get platform
    let platform = this.requestData.platform;    
    //4.get searchData
    let CompetitorAnalysissearchData = JSON.stringify(this.responseData);
    //5.get Searchquery
    let CompetitorAnalysisQuery = this.formdata.get('Keyword')?.value;

    const CompetitorAnalysisRequestData = {
      userId: this.authService.getUserInfo()?.id,
      countryName: country,
      platform: platform,
      searchData: CompetitorAnalysissearchData,
      competitorAnalysisQuery: CompetitorAnalysisQuery,
    };

    console.log(CompetitorAnalysisRequestData);

      this.UploadCompetitorAnalysisService.addCompetitorAnalysisData(CompetitorAnalysisRequestData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response:any) => {
          this.isLoading = false;
          const responseMessage = response?.message;
          this.globalSnackbar.showSuccess(responseMessage,"Close");
          console.log('Competitive Analysis data added successfully:', response);
        },
        error: (error:any) => {
          this.isLoading = false;
          const errorMessage = error?.error?.message ;
          this.globalSnackbar.showError(errorMessage, "Close");
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Competitive Strategy data upload completed.');
        }
      });
    }  
    

  ngOnDestroy(): void {
    // Notify all subscriptions to complete
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
