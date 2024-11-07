import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductReviewComponent } from '../../../../../../shared/components/product-review/product-review.component';
import { SwotAnalysisComponent } from '../../../../../../shared/components/SwoatAnalysis/swot-analysis/swot-analysis.component';
import { ExportTableAsExcelService } from '../../../../../../core/services/excel-utils/export-table-as-excel.service';

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

  @Input('responseData') responseData:any;
  @Input('country') country!:String;
  constructor( private dialog: MatDialog,
               private  exportToExcelService:ExportTableAsExcelService){}

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


}
