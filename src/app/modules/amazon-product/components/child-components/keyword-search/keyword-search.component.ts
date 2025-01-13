import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductReviewComponent } from '../../../../../shared/components/product-review/product-review.component';
import { ExportTableAsExcelService } from '../../../../../core/services/excel-utils/export-table-as-excel.service';
import { AuthService } from '../../../../../core/services/auth-service/auth.service';
import { SaveServiceDataService } from '../../../../../core/services/SaveServicesData/save-service-data.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomSnackbarService } from '../../../../../core/services/snackbar-service/custom-snackbar.service';


export interface keywordDetails {
  position:number;
  Listing_Type:string;
  best_seller:string;
  brand_crawl:string;
  keyword:string;
  pdp_title_value: string;
  web_pid: string;
  price_sp: number;
  price_rp:number;
  pdp_discount_value:number;
  pdp_rating_value:number;
  pdp_rating_count:number;
  pdp_image_url:string;
  pdp_page_url: string;
  bought:string;
}

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrl: './keyword-search.component.scss'
})


export class KeywordSearchComponent implements OnInit,AfterViewInit, OnChanges  {


 


  @Input('data') data!:any;
  @Input() formdata!:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //pagination variables
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  searchProductForm: any = FormGroup;

  isLoading:boolean = false;
  productData: keywordDetails[] = [];
  ratings: number[] = [4, 3, 2, 1];
  productSearchName!:string;
  displayedColumns: string[] = [
    'index',
    'keyword',
    'web_pid',
    'pdp_image_url',
    'pdp_title_value', 
    'brand',
    'position',
    'listingtype',
    'bestSeller',
    'price_rp',
    'price_sp' , 
    'pdp_discount_value', 
    'pdp_rating_value',
    'pdp_rating_count',
    'bought',
    'moreInfo'
   ];

   public pageSlice = this.productData;
   dataSource = new MatTableDataSource<keywordDetails>(this.pageSlice);


   private unsubscribe$ = new Subject<void>();
  

  constructor( 
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private  exportToExcelService:ExportTableAsExcelService,
    private authService:AuthService,
    private UploadKeywordDataService:SaveServiceDataService,
    private globalSnackbar: CustomSnackbarService
  ){}

  // this.globalSnackbar.showSuccess(this.responseMessage,"Close");
  ngOnChanges(changes: SimpleChanges): void {
    console.log("inside Onchanges");
  }

  ngOnInit(): void {
   this.searchProductForm = this.formBuilder.group({
      search:['']
   })

   if(this.data !== undefined){
    this.productData = this.data.Amazon_keyword_data;
    this.updatePageSlice();
   }
  
  }
   
  private updatePageSlice(): void {
    this.pageSlice = this.productData;
    this.dataSource.data = this.pageSlice;
  }

  productSearch() {
    const filterValue = this.searchProductForm.get('search')?.value || '';
    this.productSearchName = filterValue;
    // Define the filter predicate dynamically
    this.dataSource.filterPredicate = (data: keywordDetails, filter: string): boolean => {
      return data.pdp_title_value.toLowerCase().includes(filter.trim().toLowerCase());
    };
    // Apply the filter
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openReviewDialog(asinData:string){
    const requestData = {
      country: this.formdata.country,
      productSearchQuery: asinData,
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
  


  applyFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (event !== undefined && event !== null) {
      const filterValue = parseFloat(selectElement.value.toString().trim());
  
      // Apply the filter predicate
      this.dataSource.filterPredicate = (data:keywordDetails , filter: string) => {
        const rating = data.pdp_rating_value; 
        if(filterValue === 4.0 ){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating <= 5.0;
          }else{
            return  rating >= filterValue && rating >= 4.0;
          }
        }

        if(filterValue === 3.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 4.0;
          }else{
            return  rating >= filterValue && rating < 4.0;
          }
        }

        if(filterValue === 2.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 3.0;
          }else{
            return  rating >= filterValue && rating < 3.0;
          }
        }

        if(filterValue === 1.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 2.0;
          }else{
            return  rating >= filterValue && rating < 2.0;
          }
        }

        else{
          return rating === rating;
        }
        
      };
  
      // Set the filter
      this.dataSource.filter = filterValue.toString();
  
      // Log the filtered data
     
      // this.cdRef.detectChanges();
    }

  }

  changeSortOrder(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortOrder = selectElement.value as 'ratingHighToLow' | 'ratingLowToHigh' | 'priceHighToLow' | 'priceLowToHigh';
  
  switch (sortOrder) {
    case 'ratingLowToHigh':
      this.sort.active = 'pdp_rating_value';
      this.sort.direction = 'asc';
      break;
    case 'ratingHighToLow':
      this.sort.active = 'pdp_rating_value';
      this.sort.direction = 'desc';
      break;
    case 'priceLowToHigh':
      this.sort.active = 'price_sp';
      this.sort.direction = 'asc';
      break;  
    case 'priceHighToLow':
      this.sort.active = 'price_sp';
      this.sort.direction = 'desc';
      break;
  
    default:
      this.sort.active = '';
      this.sort.direction = '';
      break;
  }
  this.dataSource.sort = this.sort; // Reapply sorting with the new sortOrder
}

  onPageChange(event: PageEvent):void{
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.productData.length);
    this.pageSlice = this.productData.slice(startIndex, endIndex);
    // this.dataSource.data = this.pageSlice;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportToExcel(){
    this.exportToExcelService.exportTableAsExcel(this.productData,"Products List")
  }


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
    let searchData = JSON.stringify(this.productData);
    //6. get reviewResult

    //7. get Searchquery
    let searchQuery = this.formdata.keywordSearchQuery;
    
    const keywordRequestData = {
      userId: this.authService.getUserInfo()?.id,
      countryName: this.formdata.country,
      pincode: this.formdata.pincode,
      searchData: JSON.stringify(this.data),
      platform: this.formdata.platform,
      keywordQuery: this.formdata.keywordSearchQuery
    };

    console.log(keywordRequestData);
    
    this.UploadKeywordDataService.addKeywordData(keywordRequestData)
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
          const errorMessage = error?.error?.message || 'Error adding keyword data';
          this.globalSnackbar.showError(errorMessage, "Close");
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Keyword data upload completed.');
        }
      });
    

    
    // Simulate an operation and stop loading after 3 seconds (3000 ms)

    // setTimeout(() => {
    //   this.isLoading = false; // End loading
    //   console.log('Search data saved.');
    // }, 3000);
  }

  getPageIndex(): number {
    return this.paginator ? this.paginator.pageIndex : 0;
  }

  getPageSize(): number {
    return this.paginator ? this.paginator.pageSize : 10;
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to complete
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
