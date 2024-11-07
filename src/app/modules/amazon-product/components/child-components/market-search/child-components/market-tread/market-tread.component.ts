import { AfterRenderOptions, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItabComponent, marketSearch } from '../../../../../../../core/model/interfaces';
import { TabService } from '../../../../../../../core/services/marketTabService/tab.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AmazonProductService } from '../../../../../../../core/services/amazon-product/amazon-product.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ExportTableAsExcelService } from '../../../../../../../core/services/excel-utils/export-table-as-excel.service';

@Component({
  selector: 'app-market-tread',
  templateUrl: './market-tread.component.html',
  styleUrl: './market-tread.component.scss'
})
export class MarketTreadComponent implements ItabComponent, OnInit, OnDestroy  {


  objectKeys = Object.keys; 
  @Input() IsActive: boolean = true;
  @Input('data') data: any;

  MarketNewsSearchForm:any = FormGroup;
  marketCAGRKey: any;
  marketCAGRValues:any;

  dataSource = new MatTableDataSource<marketSearch>();
  displayedColumns: string[] = [ 'index','title','descr'];
  activeTab:string = "SearchResult";
  isLoading:boolean = false;
  newsData: any;
  marketSearchData!: marketSearch;
  
  unsubscribe$ = new Subject<void>();
  constructor(private cdRef: ChangeDetectorRef,
              private tabService: TabService, 
              private formBuilder:FormBuilder,
              private amazonProductService: AmazonProductService,
              private  exportToExcelService:ExportTableAsExcelService
  ) {}


  CanClose(): boolean {
    return true;
  }

  ngOnInit(): void {
    debugger
    this.MarketNewsSearchForm = this.formBuilder.group({
         search:['']
    })
    this.marketSearchData = this.data;
    this.loadData();
    this.dataSource.data = this.marketSearchData.market_trend_list;  
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log("inside changes");
  //   // this.marketSearchData = this.data;
  //   // this.dataSource.data = this.marketSearchData.market_trend_list;
  //   // this.loadData();
  // }

  loadData() {
    // Load your data
    // this.marketSearchData = this.data;

    const marketCAGRData = this.marketSearchData.market_cagr[0];

    // Extract keys from marketCAGRData
    const marketCagrKeys = Object.keys(marketCAGRData);
    this.marketCAGRValues= Object.values(marketCAGRData)

    // Function to format the keys (remove underscores and make camelCase)
     const formatKey = (key: string) => {
     return key
    .replace(/_\d+/g, '') // Remove numbers after underscores (optional)
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\(([^)]+)\)/g, '') // Remove text inside parentheses
    .trim();
    };
    const formattedKeys = marketCagrKeys.map(key => formatKey(key));

    // Assign the data to the new dynamic interface
    this.marketCAGRKey = formattedKeys;
  }

  handleSubmit(){
    this.isLoading = true;
    const formdata=this.MarketNewsSearchForm.value;
    const data = formdata.search;

    const requestData = {
      country: "",
      productSearchQuery: data,
      keywordSearchQuery: "",
      marketSearchQuery: "",
      pincode: ""
    };

    console.log(requestData);
    
    let apiCall$ = this.amazonProductService.market_news_search(requestData);
    apiCall$.pipe(
      takeUntil(this.unsubscribe$),
      finalize(()=>{
        this.isLoading = false;
      })
    ).subscribe((responseData: any)=>{
      this.isLoading = false;
      this.newsData = responseData;
      console.log(this.newsData);
     
    },error => {
      this.isLoading = false;
      console.error('Error fetching search results:', error);
      // Handle error here if needed
    })
  }

  createMarketTreadTab() {
    this.tabService.addNewTab('Market Trend And News');
  }

  onTabClick(tab:string){
      this.activeTab= tab;
  }

  exportToExcel(){
    this.exportToExcelService.exportTableAsExcel(this.dataSource.data,"Market Trend List")
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
