import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomSnackbarService } from '../../../../../../core/services/snackbar-service/custom-snackbar.service';
import { SaveServiceDataService } from '../../../../../../core/services/SaveServicesData/save-service-data.service';
import { AuthService } from '../../../../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-competitive-stratergy',
  templateUrl: './competitive-stratergy.component.html',
  styleUrl: './competitive-stratergy.component.scss'
})
export class CompetitiveStratergyComponent implements OnInit {


  activeTab:string = "CompetitorRivals";
  pageHidden:boolean = true;
  isLoading:boolean = false;

  @Input('data') data:any;
  @Input() formdata!:any;
  CompetitorSearchData:any;


  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService:AuthService,
    private globalSnackbar: CustomSnackbarService,
    private UploadKeywordDataService:SaveServiceDataService
  ){}

  ngOnInit(): void {
    
    if(this.data != null||undefined){
       this.CompetitorSearchData = this.data.Search_result;
       this.pageHidden = !this.pageHidden;
    }
  }

  onTabClick(tab: string) {
    this.activeTab= tab;
  }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
    let CompetitiveStrategysearchData = JSON.stringify(this.CompetitorSearchData);
    //6.get Searchquery
    let CompetitiveStrategyQuery = this.formdata.competitiveSearchQuery;

    const CompetitiveStrategyRequestData = {
      userId: this.authService.getUserInfo()?.id,
      countryName: country,
      pincode: pincode,
      searchData: CompetitiveStrategysearchData,
      platform: platform,
      competitiveSearchQuery: CompetitiveStrategyQuery,
    };

    console.log(CompetitiveStrategyRequestData);

      this.UploadKeywordDataService.addCompetitiveStrategyData(CompetitiveStrategyRequestData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response:any) => {
          this.isLoading = false;
          const responseMessage = response?.message;
          this.globalSnackbar.showSuccess(responseMessage,"Close");
          console.log('Competitive Strategy data added successfully:', response);
        },
        error: (error) => {
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
};
