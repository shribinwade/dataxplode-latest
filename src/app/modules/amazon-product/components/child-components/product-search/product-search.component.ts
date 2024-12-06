import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { productSearch } from '../../../../../core/model/product-search';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BulletpointsComponent } from './dialog-component/bulletpoints/bulletpoints.component';
import { SpecificationComponent } from './dialog-component/specification/specification.component';

import { AmazonProductService } from '../../../../../core/services/amazon-product/amazon-product.service';
import { CustomSnackbarService } from '../../../../../core/services/snackbar-service/custom-snackbar.service';
import { ImportantInfoComponent } from './dialog-component/important-info/important-info.component';
import { ProductReviewComponent } from '../../../../../shared/components/product-review/product-review.component';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth-service/auth.service';
import { SaveServiceDataService } from '../../../../../core/services/SaveServicesData/save-service-data.service';

@Component({
  selector: 'app-product-search',
  templateUrl:'./product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit {

  constructor(
    private dialog: MatDialog, 
    private authService:AuthService,
    private UploadKeywordDataService:SaveServiceDataService,
    private amazonProductService: AmazonProductService,
    private globalSnackbar: CustomSnackbarService
  ) {}


  @Input('data') data!: any;

  @Input() formdata!:any;
  
  productSearchData!: productSearch;
  
  currency: string= "INR";
  
  isLoading:boolean = false;

  reviewCall$!: any;

  receviedData!: any;

  private unsubscribe$ = new Subject<void>();

  
  
  ngOnInit(): void {
      //console.log(this.country);
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
  
  //Upload Data Function
  saveSearchData(){
    this.isLoading = true; // Start loading
    //To DO
    //1.getUser ID
    const userId = this.authService.getUserInfo()?.id;
    //2.get Country
    let country = this.formdata.country;
    //3.get pincode 
    let pincode = this.formdata.pincode;
    //4.get platform
    let platform = this.formdata.platform;    
    //5.get searchData
    let ProductsearchData = JSON.stringify(this.productSearchData);
    //6. get Searchquery
    let ProductsearchQuery = this.formdata.productSearchQuery;
    
    const requestData = {
      country: country,
      productSearchQuery: ProductsearchQuery,
      pincode: pincode
    };
    
    //8. get reviewResult
    this.reviewCall$ = this.amazonProductService.amazon_product_reviews(requestData);
    
    this.reviewCall$.pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe((responseData: any) => {
      console.log(this.receviedData);
      this.receviedData = responseData
      this.uploadData();
    },(error:any) =>{
      this.globalSnackbar.showError("No reviews Found for this product","Close");
    })

    
  };

  // callapi() {
  //   console.log("inside callapi loading review");
  //   this.reviewCall$.pipe(
  //     takeUntil(this.unsubscribe$),
  //     finalize(() => {})
  //     ).subscribe((responseData: any) => {
  //     console.log(this.receviedData);
  //     return responseData;
  //   },(error:any) =>{
  //     this.globalSnackbar.showError("No reviews Found for this product","Close");
  //     return "";
  //   })
  // }

  uploadData(){

       //To DO
    //1.getUser ID
    const userId = this.authService.getUserInfo()?.id;
    //2.get Country
    let country = this.formdata.country;
    //3.get pincode 
    let pincode = this.formdata.pincode;
    //4.get platform
    let platform = this.formdata.platform;    
    //5.get searchData
    let ProductsearchData = JSON.stringify(this.productSearchData);
    //6. get Searchquery
    let ProductsearchQuery = this.formdata.productSearchQuery;

    const ProductRequestData = {
      userId: this.authService.getUserInfo()?.id,
      countryName: country,
      pincode: pincode,
      searchData: ProductsearchData,
      platform: platform,
      productSearchQuery: ProductsearchQuery,
      reviewResult: JSON.stringify(this.receviedData)
    };

    console.log(ProductRequestData);
    if(this.receviedData != null && undefined){
      this.UploadKeywordDataService.addProductData(ProductRequestData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response:any) => {
          this.isLoading = false;
          const responseMessage = response?.message;
          this.globalSnackbar.showSuccess(responseMessage,"Close");
          console.log('Keyword data added successfully:', response);
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage = error?.error?.message ;
          this.globalSnackbar.showError(errorMessage, "Close");
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Keyword data upload completed.');
        }
      });
    }else{
      this.isLoading = false;
      this.globalSnackbar.showError("No Reviews Found for ASIN:"+ ProductsearchQuery, "Close");
    }  
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to complete
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
