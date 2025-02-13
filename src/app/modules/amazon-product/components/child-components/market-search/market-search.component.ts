import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TabService } from '../../../../../core/services/marketTabService/tab.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth-service/auth.service';
import { CustomSnackbarService } from '../../../../../core/services/snackbar-service/custom-snackbar.service';
import { SaveServiceDataService } from '../../../../../core/services/SaveServicesData/save-service-data.service';



@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrl: './market-search.component.scss'
})
export class MarketSearchComponent implements OnInit {

  @Input('data') data:any;
  @Input() formdata!:any;

  private unsubscribe$ = new Subject<void>();
  isLoading:boolean = false;

  constructor(
    private tabService: TabService,
    private authService:AuthService,
    private globalSnackbar: CustomSnackbarService,
    private UploadMarketService:SaveServiceDataService
  ){}

  ngOnInit(): void {
    // console.log(this.data); 
    this.insertComponent('Market Trend And News');
  }

  insertComponent(code: string) {
   this.tabService.tabItemObservable.next(code);
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
    let searchData = JSON.stringify(this.data);
    
    //6.get Searchquery
    let searchQuery = this.formdata.marketSearchQuery;
    
    const marketRequestData = {
      userId: this.authService.getUserInfo()?.id,
      countryName: this.formdata.country,
      searchData: JSON.stringify(this.data),
      platform: this.formdata.platform,
      marketSearchQuery: this.formdata.marketSearchQuery
    };

    console.log(marketRequestData);
    
    this.UploadMarketService.addMarketData(marketRequestData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response:any) => {
          this.isLoading = false;
          const responseMessage = response?.message;
          this.globalSnackbar.showSuccess(responseMessage,"Close");
          console.log('Market data added successfully:', response);
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage = error?.error?.message || 'Error adding Market data';
          this.globalSnackbar.showError(errorMessage, "Close");
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Market data upload completed.');
        }
      });
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to complete
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
    
}
