import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ECommerceSitesService } from '../../../../core/services/e-commerce-sites/e-commerce-sites.service';
import { KeywordSearchComponent } from '../child-components/keyword-search/keyword-search.component';
import { MarketSearchComponent } from '../child-components/market-search/market-search.component';
import { ProductSearchComponent } from '../child-components/product-search/product-search.component';
import { AmazonProductService } from '../../../../core/services/amazon-product/amazon-product.service';
import { GlobalConstants } from '../../../../core/constants/global-constants';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DistributorSearchComponent } from '../child-components/distributor-search/distributor-search/distributor-search.component';
import { CompetitiveStratergyComponent } from '../child-components/competitive-stratergy/competitive-stratergy/competitive-stratergy.component';
import { ShowModalService } from '../../../../core/services/showModalService/show-modal.service';
import { CompetitorAnalysisFinalComponent } from '../child-components/competitive-analysis-table/competitor-analysis-final/competitor-analysis-final.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Define a type for the dynamic components
type DynamicComponent = ProductSearchComponent | KeywordSearchComponent | MarketSearchComponent;

@Component({
  selector: 'app-market-intelligence',
  templateUrl: './market-intelligence.component.html',
  styleUrls: ['./market-intelligence.component.scss'],  // Fixed typo here
  animations: [
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({ width: '10px',opacity:'1'})),
      state('expanded', style({ opacity:'', overflow:'hidden'})),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),

    trigger('expandCollapseContent', [
      state('collapsed', style({ width:'98%', })),
      state('expanded', style({   })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MarketIntelligenceComponent implements AfterViewInit, OnDestroy {

  filteredSites: Array<{ id: number; name: string; src: string }> = [];
  ecommarcebrands: any;
  selectedSites = '';
  selectedCountry = '';
  selectedService = '';
  selectedCountrySites: any;
  selectedCities: string[] = [];

  isLoading: boolean = false;
  responseMessage: any;
  reviewData: any;

  //Product search input
  productSearchQuery: string = '';
  hiddenproductSearch: boolean = true;
  pincodeQuery: string = '';
  hiddenpincode: boolean = true;

  //Keyword search input
  keywordSearchQuery: string = '';
  hiddenKeywordSearch: boolean = true;

  //Market search input
  marketSearchQuery: string = '';
  hiddenMarketSearch: boolean = true;

  //Distributor search input
  distributorSearchQuery: string = '';
  hiddenDistributorSearch: boolean = true;
  disabledDistributor:boolean=false;

  //Competitive Stratergy Search
  CompetitiveStratergySearchQuery: string = '';
  hiddenCompetitiveStratergySearch: boolean = true;

  //Competitive analysis search
  hiddenCompetitiveAnalysisSearch: boolean = false;

  //CompetitorAnalysis
  CompetitorAnalysisData:any;
  formData:any;

  //chevron icon
  chevron:string = "chevron_right";

  //expand
  isExpanded = true;

  // ViewChild elements
  @ViewChild('country') country!: ElementRef;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  @ViewChild('sites') sites!: ElementRef;

  unsubscribe$ = new Subject<void>();
  

  // Dependency Injection
  constructor(
    private ecommarcesites: ECommerceSitesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private amazonProductService: AmazonProductService,
    private globalSnackbar: CustomSnackbarService,
    private showModalService:ShowModalService
  ) {
    this.ecommarcebrands = ecommarcesites.eCommerceSites;
  }

  // Ensure ViewChild for dynamic component is available
  ngAfterViewInit(): void {
    if (!this.dynamicComponentContainer) {
      console.error('dynamicComponentContainer is not available.');
    }
  }


  onSelected(): void {
    this.selectedCountry = this.country.nativeElement.value;
    this.disabledDistributor = (this.selectedCountry !== "India")? true: false;
    this.filterSites();
  }

  // Filter sites based on selected country
  filterSites() {
    debugger
    if (this.selectedCountry) {
      this.selectedCountrySites = this.ecommarcebrands.find((site: any) => site.country === this.selectedCountry);
      this.selectedCities = this.selectedCountrySites ? this.selectedCountrySites.cities : [];
      this.filteredSites = this.selectedCountrySites ? this.selectedCountrySites.sites : [];
    } else {
      this.filteredSites = [];
    }
  }

  onSelectedService(service: string): void {
   
    this.selectedService = service;
    if (service == "ProductSearch") {
      this.hiddenproductSearch = false;
      this.hiddenCompetitiveAnalysisSearch = false;
      this.hiddenKeywordSearch = true;
      this.hiddenMarketSearch = true;
      this.hiddenDistributorSearch = true;
      this.hiddenCompetitiveStratergySearch = true;
      this.loadDynamicComponent(service);
    }
    else if (service == "KeywordSearch") {
      this.hiddenKeywordSearch = false;
      this.hiddenCompetitiveAnalysisSearch = false;
      this.hiddenMarketSearch = true;
      this.hiddenproductSearch = true;
      this.hiddenDistributorSearch = true;
      this.hiddenCompetitiveStratergySearch = true;
      this.loadDynamicComponent(service);
    }
    else if (service == "MarketSearch") {
      this.hiddenMarketSearch = false;
      this.hiddenCompetitiveAnalysisSearch = false;
      this.hiddenproductSearch = true;
      this.hiddenKeywordSearch = true;
      this.hiddenDistributorSearch = true;
      this.hiddenCompetitiveStratergySearch = true;
      this.loadDynamicComponent(service);
    }
    else if(service == "DistributorSearch"){
      this.hiddenDistributorSearch = false;
      this.hiddenCompetitiveAnalysisSearch = false;
      this.hiddenproductSearch = true;
      this.hiddenKeywordSearch = true;
      this.hiddenMarketSearch = true;
      this.hiddenCompetitiveStratergySearch = true;
      this.loadDynamicComponent(service);
    }
    else if(service == "CompetitiveStratergySearch"){
      this.hiddenCompetitiveStratergySearch = false;
      this.hiddenCompetitiveAnalysisSearch = false;
      this.hiddenDistributorSearch = true;
      this.hiddenproductSearch = true;
      this.hiddenKeywordSearch = true;
      this.hiddenMarketSearch = true;
      this.loadDynamicComponent(service);
    }
    else if(service == "CompetitorAnalysisSearch"){
      this.OpenCompetitorAnalysisModel();
      this.hiddenCompetitiveAnalysisSearch = true;
      this.hiddenCompetitiveStratergySearch = true;
      this.hiddenDistributorSearch = true;
      this.hiddenproductSearch = true;
      this.hiddenKeywordSearch = true;
      this.hiddenMarketSearch = true;
    }

  }

  onSelectedSites(): void {
    this.selectedSites = this.sites.nativeElement.value;
  }

  // This method returns the Type of the component based on the component name
  getComponentType(name: string): Type<any> | null {
    const componentMap: { [key: string]: Type<any> } = {
      'ProductSearch': ProductSearchComponent,
      'KeywordSearch': KeywordSearchComponent,
      'MarketSearch': MarketSearchComponent,
      'DistributorSearch': DistributorSearchComponent,
      'CompetitiveStratergySearch':CompetitiveStratergyComponent,
      'CompetitorAnalysisSearch': CompetitorAnalysisFinalComponent
    };
    return componentMap[name] || null; // Return null if no matching component is found
  }



  // Dynamically load component based on service
  loadDynamicComponent(service: string): void {
    
    this.dynamicComponentContainer.detach();  // Clear existing component
    const componentType = this.getComponentType(service);

    if (componentType) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      const componentRef = this.dynamicComponentContainer.createComponent(componentFactory);

      if(service === 'CompetitorAnalysisSearch'){
        (componentRef.instance as CompetitorAnalysisFinalComponent).responseData = this.CompetitorAnalysisData;
        (componentRef.instance as CompetitorAnalysisFinalComponent).country = this.selectedCountry;
       
        componentRef.changeDetectorRef.detectChanges(); // Call detectChanges after setting data
      }
      

      // switch (service) {
      //   case 'ProductSearch':
      //     componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductSearchComponent);
      //     break;
      //   case 'KeywordSearch':
      //     componentFactory = this.componentFactoryResolver.resolveComponentFactory(KeywordSearchComponent);
      //     break;
      //   case 'MarketSearch':
      //     componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarketSearchComponent);
      //     break;
      //   default:
      //     return;
      // }

    }
    // if (componentFactory) {
    //   this.dynamicComponentContainer.createComponent(componentFactory);
    // }
  }

  // Triggered on form search
  onSearch(): void {
    if (this.selectedService) {

      const requestData = {
        country: this.selectedCountry,
        productSearchQuery: this.productSearchQuery,
        keywordSearchQuery: this.keywordSearchQuery,
        marketSearchQuery: this.marketSearchQuery,
        distributorSearchQuery: this.distributorSearchQuery,
        competitiveSearchQuery: this.CompetitiveStratergySearchQuery,
        pincode: this.pincodeQuery,
        platform:this.selectedSites
      };

      let apiCall$;
      let reviewCall$!: Observable<any>;

      switch (this.selectedService) {
        case 'ProductSearch':
          // reviewCall$  = this.amazonProductService.amazon_product_reviews(requestData);
          apiCall$ = this.amazonProductService.amazon_product_asin_search(requestData);
          break;
        case 'KeywordSearch':
          apiCall$ = this.amazonProductService.amazon_product_keyword_search(requestData);
          break;
        case 'MarketSearch':
          apiCall$ = this.amazonProductService.market_search(requestData);
          break;
        case 'DistributorSearch':
          apiCall$ = this.amazonProductService.distributor_search(requestData);
          break; 
        case 'CompetitiveStratergySearch':
          apiCall$ = this.amazonProductService.competitve_stratergy_search(requestData);
          break;     
        default:
          return;
      }
      this.isLoading = true;
      // Subscribe to the service and handle the response
      apiCall$.pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
       
        console.log(responseData);
        
        if (this.dynamicComponentContainer) {
          this.dynamicComponentContainer.clear();  // Clear the container
          const componentType = this.getComponentType(this.selectedService);

          if (componentType) {
            const componentRef = this.dynamicComponentContainer.createComponent(componentType);
            this.isLoading = false;
            // Set the data in the dynamically loaded component
            if (this.selectedService === 'ProductSearch') {

              (componentRef.instance as ProductSearchComponent).data = responseData;
              (componentRef.instance as ProductSearchComponent).formdata = requestData;
              componentRef.changeDetectorRef.detectChanges();

              // Call detectChanges after setting data
            } else if (this.selectedService === 'KeywordSearch') {
              (componentRef.instance as KeywordSearchComponent).data = responseData;
              (componentRef.instance as KeywordSearchComponent).formdata = requestData;
             
              componentRef.changeDetectorRef.detectChanges(); // Call detectChanges after setting data

            } else if (this.selectedService === 'MarketSearch') {
              (componentRef.instance as MarketSearchComponent).data = responseData;
              componentRef.changeDetectorRef.detectChanges(); // Call detectChanges after setting data
            }

            else if (this.selectedService === 'DistributorSearch') {
              (componentRef.instance as DistributorSearchComponent).data = responseData;
              (componentRef.instance as DistributorSearchComponent).formdata = requestData;
              componentRef.changeDetectorRef.detectChanges(); // Call detectChanges after setting data
            }
            else if (this.selectedService === 'CompetitiveStratergySearch') {
              (componentRef.instance as CompetitiveStratergyComponent).data = responseData;
              (componentRef.instance as KeywordSearchComponent).formdata = requestData;
              componentRef.changeDetectorRef.detectChanges(); // Call detectChanges after setting data
            }
          }

        } else {
          console.error('dynamicComponentContainer is undefined');
          this.isLoading = false;
          return;
        }

        this.isLoading = false;

      }, (error) => {
        this.isLoading = false;
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.globalSnackbar.showError(this.responseMessage, GlobalConstants.error);
      });

    }



    // Dynamically load the appropriate component
    // let componentFactory: ComponentFactory<DynamicComponent>;

    // switch (this.selectedService) {
    //   case 'ProductSearch':
    //    componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductSearchComponent);
    //     break;
    //   case 'KeywordSearch':
    //     componentFactory = this.componentFactoryResolver.resolveComponentFactory(KeywordSearchComponent);
    //     break;
    //   case 'MarketSearch':
    //     componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarketSearchComponent);
    //     break;
    // }
  }

  OpenCompetitorAnalysisModel(){
    console.log("Inside method Open");
    this.showModalService.showCompetitorAnalysisModel(this.selectedCountry);
    this.showModalService.componentRef.instance.responseData.subscribe((responseData)=>{
      this.CompetitorAnalysisData = responseData;
      this.loadDynamicComponent(this.selectedService);
     })
  }

  toggleSearchCard(){
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    throw new Error('Method not implemented.');
  }

}
