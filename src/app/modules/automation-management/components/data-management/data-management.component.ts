import {ChangeDetectorRef,Component,ElementRef,OnChanges,OnInit,SimpleChanges,ViewChild,} from '@angular/core';
import { ECommerceSitesService } from '../../../../core/services/e-commerce-sites/e-commerce-sites.service';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import {AbstractControl,FormBuilder,FormControl,FormGroup,ValidatorFn,Validators,} from '@angular/forms';
import * as XLSX from 'xlsx';
import { ExcelToJsonService } from '../../../../core/services/excel-to-json-Utils/excel-to-json.service';
import { ExcelTemplateService } from '../../../../core/services/Excel-download-template/excel-template.service';
import { SchedulerService } from '../../../../core/services/schedulerService/scheduler.service';
import { MatTableDataSource } from '@angular/material/table';
import { AmazonProductService } from '../../../../core/services/amazon-product/amazon-product.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map } from 'rxjs';

export interface scheduleTime {
  startDate: Date;
  endDate: Date;
  time: Date;
}

export interface serviceBatch{
  id: number;
  service: string;
  serviceBranch: BatchJob[];
  scheduledTime: Date;
  status: 'Scheduled' | 'Processing' | 'Completed' | 'Failed';
}

export interface BatchJob {
  id: number;
  service: string;
  country: string;
  brand: string;
  location: string;
  scheduledTime: Date;
  status: 'Scheduled' | 'Processing' | 'Completed' | 'Failed';
}

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class DataManagementComponent implements OnInit {
  filteredSites: Array<{ id: number; name: string; src: string }> = [];
  selectedCountry = '';
  selectedPlatform = '';
  selectedService = '';
  selectedProductType = '';
  submitted = false;
  selectedCountrySites: any;
  ecommarcebrands: any;
  countryPlatforms: any;
  // selectedtime: any;
  startDate!: Date;
  endDate!: Date;
  buttonDisabled: boolean = true;

  constructor(
    private ecommarcesites: ECommerceSitesService,
    private globalSnackbar: CustomSnackbarService,
    private excelTemplate: ExcelTemplateService,
    private sechedulerService: SchedulerService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private amazonProductService: AmazonProductService,
  ) {
    this.ecommarcebrands = ecommarcesites.eCommerceSites;
  }

  // dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'service', 'scheduledTime', 'status'];
  serviceToDisplay = ['id','service', 'brand', 'location', 'scheduledTime', 'status'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?:BatchJob | null;
  // expandedElement: PeriodicElement | null;

  dateTimeForm: any = FormGroup;
  excelProductData: any[] = [];
  excelProductLocationData: any[] = [];

  productExcelData(data: any) {
    this.excelProductData = data;
    console.log(data);
  }

  locationExcelData(data: any) {
    this.excelProductLocationData = data;
    console.log(data);
  }

  ngOnInit(): void {
    this.dateTimeForm = this.formBuilder.group(
      {
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        scheduleTime: ['', Validators.required],
      },
      {
        validators: [this.currentDateValidator(), this.dateRangeValidator()],
      }
    );
  }

  currentDateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const start = new Date(formGroup.get('startDate')?.value);
      const today = new Date();

      if (!start || isNaN(start.getTime())) {
        return { dateCurrentInvalid: true }; // Invalid or empty date
      }
      // Remove time part for accurate date-only comparison
      today.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      return start < today ? { dateCurrentInvalid: true } : null;
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const start = new Date(formGroup.get('startDate')?.value);
      const end = new Date(formGroup.get('endDate')?.value);
      return start && end && start > end ? { dateInvalid: true } : null;
    };
  }

  // ViewChild elements
  @ViewChild('country') country!: ElementRef;
  @ViewChild('picker') timePicker!: any;

  onSubmit(form: any) {
    if (form.valid) {
      this.submitted = true;
    }
    console.log(
      this.selectedCountry + this.selectedPlatform + this.selectedService
    );
  }

  onCountrySelected(): void {
    this.selectedCountry = this.country.nativeElement.value;
    this.filterSites();
  }

  // Filter sites based on selected country
  filterSites() {
    if (this.selectedCountry) {
      //Getting Platforms based on country selection
      this.selectedCountrySites = this.ecommarcebrands.find(
        (site: any) => site.country === this.selectedCountry
      );
      this.filteredSites = this.selectedCountrySites
        ? this.selectedCountrySites.sites
        : [];
      //for City
      // this.selectedCities = this.selectedCountrySites ? this.selectedCountrySites.cities : [];
    } else {
      this.filteredSites = [];
    }
  }

  //Schedule Time
  formControlItem: FormControl = new FormControl('');

  onDateSubmit() {
    if (this.dateTimeForm.invalid) {
      this.buttonDisabled = true;
      this.dateTimeForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return; // Stop the submission if the form is invalid
    } else if (this.dateTimeForm.valid) {
      this.buttonDisabled = false;
      this.globalSnackbar.showSuccess(
        'Date and Time Confirmed',
        'Close',
        5000,
        'center'
      );
    }
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

  //Download template excel
  downloadExcel(Service: string) {
    this.excelTemplate.downloadExcel(Service);
  }

  serviceBatch:serviceBatch[] = [];
  // batchJob: BatchJob[] = []; // Stores scheduled batches
  dataSource = new MatTableDataSource<serviceBatch>(this.serviceBatch);
  batchJobTables = new Map<number,MatTableDataSource<BatchJob>>();

  batchCounter = 0; // Unique ID counter
  serviceCounter = 0; //Unique ID counter

  toggle(element:BatchJob){
    this.expandedElement = (this.expandedElement === element) ? null : element;
      this.loadSubtableData()
  }

  loadSubtableData(){
     
  }

  searchBegins() {
    debugger;
    //To-do
    // check date time form valid
    if (this.dateTimeForm.valid && this.selectedService) {

      if (!this.excelProductData.length ||!this.excelProductLocationData.length) {
        this.globalSnackbar.showError('Product or Location data is missing!','Close',5000,'center');
        return;
      }
      this.scheduleProcessing();
    } else {
      this.dateTimeForm.invalid? this.globalSnackbar.showError('Please select date and time','Close',5000,'center'): 
      this.globalSnackbar.showError('Please select the service','Close',5000,'center');
    }

    // create shedular based time form

    // check product data extreacted form excel in array format

    // check loaction data extraceted from excel in array format

    // based on shedule time get first element product data and from location data and send http request to productSearch api
    //  and iterate till last based  on both array

    // after getting data store in db
  }

  scheduleProcessing() {
    debugger
    const now = new Date();
    const selectedDate = new Date(this.dateTimeForm.value.startDate);
    const selectedTime = this.dateTimeForm.value.scheduleTime;

    // Convert 12-hour format (e.g., "5:00 AM") to 24-hour format
    const timeParts = selectedTime.match(/(\d+):(\d+) (\w+)/); // Extract hours, minutes, AM/PM
    if (!timeParts) {
      this.globalSnackbar.showError('Invalid time format!', 'Close', 5000, 'center');
      return;
    }

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3]; // AM or PM

    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM to 24-hour format
    } else if (period === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00:00
    }

    // Merge date & converted time
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes, 0, 0);  // Set time correctly

    if (scheduledDateTime <= now) {
      this.globalSnackbar.showError('Selected time is in the past!', 'Close', 5000, 'center');
      return;
    }
    // Calculate delay (milliseconds)
    const timeDifference = scheduledDateTime.getTime() - now.getTime();


    //Create unique service ID
    const serviceID = ++this.serviceCounter;
    const serviceBatch : serviceBatch = {
        id: serviceID,
        service: this.selectedService,
        serviceBranch : [],
        scheduledTime: scheduledDateTime,
        status: 'Scheduled'
    }
    this.serviceBatch.push(serviceBatch);
    this.dataSource.data = [...this.serviceBatch]

    // Create a new batch job list for this service
    const batchJobsForService: BatchJob[] = [];
 
    // Schedule batch processing for each product-location combination
    this.excelProductData.forEach(product => {
      this.excelProductLocationData.forEach(location => {
        const batchId = ++this.batchCounter;
        
        const batch: BatchJob = {
          id: batchId,
          country: location.Country,
          service: this.selectedService,
          brand: product.Brand,
          location: location.Location,
          scheduledTime: scheduledDateTime,
          status: 'Scheduled'
        };
  
        batchJobsForService.push(batch); 
        // this.batchJob.push(batch);
        // this.dataSource.data = [...this.batchJob];
        
        setTimeout(() => {
          this.processBatch(batchId,serviceID);
        }, timeDifference);
      });
    });

        // Store the batch list in the map for this serviceID
        serviceBatch.serviceBranch = batchJobsForService;
       this.batchJobTables.set(serviceID, new MatTableDataSource<BatchJob>(batchJobsForService));


  }


  processBatch(batchId: number,serviceID:number) {
    const batchList = this.batchJobTables.get(serviceID);
    if (!batchList) return;
    let batch = batchList.data.find(b=> b.id ===batchId);
    // let batch = batchList.(b => b.id === batchId);
    let service = this.serviceBatch.find(s => s.id === serviceID);
    if (!service || !batch) return;

    batch.service = this.selectedService;
    batch.status = 'Processing';
    service.status = "Processing";
    console.log(`🚀 Processing batch ${batchId}: ${batch.brand} at ${batch.location}`);
    
    // Process each product with each location
      // Call API
      this.amazonProductService.amazon_product_keyword_search({country: batch.country,keywordSearchQuery: batch.brand}).subscribe((response) => {

          batch.status = 'Completed';
          console.log(batch.status);

          if (this.isAllBatchesCompleted(serviceID)) {
            service.status = "Completed"
            console.log('🎉 All batches are completed!');
          }
          // this.dataSource.data = [...this.batchJobs]; // ✅ Update UI
        },
         (error) => {
          if (this.isALLBatchesFailed(serviceID)) {
            service.status = "Failed";
          }
          batch.status = 'Failed';
          console.error('Error:', error);
          // this.dataSource.data = [...this.batchJobs]; // ✅ Update UI
        }
      );
  }

  getBatchDataSource(serviceId: number): MatTableDataSource<BatchJob> {
    return this.batchJobTables.get(serviceId) ?? new MatTableDataSource<BatchJob>([]);
  }

  isAllBatchesCompleted(serviceID: number): boolean {
    const batchList = this.batchJobTables.get(serviceID);
    return batchList? batchList.data.every(batch => batch.status === 'Completed'): false;
  }
  isALLBatchesFailed(serviceID: number): boolean{
    const batchList = this.batchJobTables.get(serviceID);
    return batchList? batchList.data.every(batch => batch.status === 'Failed'): false;
  }

    
}
