import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { productSearch } from '../../../../../core/model/product-search';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BulletpointsComponent } from './dialog-component/bulletpoints/bulletpoints.component';
import { SpecificationComponent } from './dialog-component/specification/specification.component';

import { AmazonProductService } from '../../../../../core/services/amazon-product/amazon-product.service';
import { CustomSnackbarService } from '../../../../../core/services/snackbar-service/custom-snackbar.service';
import { ImportantInfoComponent } from './dialog-component/important-info/important-info.component';
import { ProductReviewComponent } from '../../../../../shared/components/product-review/product-review.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit {

  constructor(
    private dialog: MatDialog, 
  ) {}

  

  @Input('data') data!: any;

  @Input() formdata!:any;
  
  productSearchData!: productSearch;

  currency: string= "INR";
  
  



  ngOnInit(): void {
  //  console.log(this.country);
   console.log(this.data);
   
    if(this.data !== null && this.data !== undefined ){
      this.productSearchData = this.data.Amazon_info[0];
      // console.log(this.productSearchData.Availablity);
      const country = this.formdata.country; 
     this.currency= this.checkCurrency(country);
    } 
  }

  checkCurrency(country: string): string {
    switch (country) {
      case 'United States':
        return 'USD'; // US Dollar
      case 'United Kingdom':
        return 'GBP'; // British Pound
      case 'Germany':
        return 'EUR'; // Euro
      case 'France':
        return 'EUR'; // Euro
      case 'Italy':
        return 'EUR'; // Euro
      case 'India':
        return 'INR'; // Indian Rupee
      case 'Canada':
        return 'CAD'; // Canadian Dollar
      case 'Saudi Arabia':
        return 'SAR'; // Saudi Riyal
      case 'United Arab Emirates':
        return 'AED'; // UAE Dirham
      case 'Egypt':
        return 'EGP'; // Egyptian Pound
      default:
        return 'INR'; // Handle unknown countries
    }
  }

  //Dialog components
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  handleSpecificationAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    
    this.dialog.open(SpecificationComponent, { width: '900px',
      height: '400px',
      data: {product_features:this.productSearchData.Product_features} 
    });
  }

  handleBulletPointsAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(BulletpointsComponent, {
      width: '900px',
      data: {bullet: this.productSearchData.Bullet_point}
    });
  }

  handleReviewListAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = {formdata:this.formdata}
    this.dialog.open(ProductReviewComponent  , dialogConfig);
  }

  handleImpInfoAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ImportantInfoComponent, {
      width: '900px',
      data: {impinfo: this.productSearchData.Important_information}
    });
  }

  

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  


}
