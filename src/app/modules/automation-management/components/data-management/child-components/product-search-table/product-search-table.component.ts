import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ExcelTemplateService } from '../../../../../../core/services/Excel-download-template/excel-template.service';
import { ExcelToJsonService } from '../../../../../../core/services/excel-to-json-Utils/excel-to-json.service';


export interface Sheet{
  Sheet1:ProductTableElements[];
}

export interface ProductTableElements {
  Platform:any,	
  PlatformId: any,	
  WebPID: any,	
  Brand: any,
  Product: any,
  Type: any,
  Country: any
}

@Component({
  selector: 'app-product-search-table',
  templateUrl: './product-search-table.component.html',
  styleUrl: './product-search-table.component.scss',
})
export class ProductSearchTableComponent implements OnChanges {

  @Input() country!: string; // Country input property
  @Input() platform!: string;

  @Output() excelProductData = new EventEmitter<any>();
  @Output() excelLoacationData =  new EventEmitter<any>();


  displayedColumns: string[] = ['platform','platformId','webpid','brand','productType','country'];
  dataSource: ProductTableElements[] = [];
  locationDataSource: any[]=[];
  ExcelToJSON!:Sheet;

  platformData: string = '';
  isProductExcelUploaded: boolean = false;
  isLocationExcelUploaded: boolean = false;


  constructor(
    private excelTemplate: ExcelTemplateService,
    private excelToJsonService: ExcelToJsonService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform'] || changes['country']) {
      // this.updateDataSource();
    }
  }

  handleFileChange(event: any) {
    this.excelToJsonService.onFileChange(event).subscribe({
      next: (dataString) => {
        // this.ExcelToJSON = dataString;
        this.ExcelToJSON = JSON.parse(dataString);
        console.log('JSON Data:', this.ExcelToJSON);
        console.log('JSON Data:', Object.keys(this.ExcelToJSON));
        console.log('JSON Data:', this.ExcelToJSON.Sheet1[0].Country);
        this.updateDataSource();
        // Do something with the dataString
      },
      error: (error) => {
        this.isProductExcelUploaded = false;
        console.error('Error reading file:', error);
      },
      complete: () => {
        console.log('File processing complete.');
      },
    });
  }

  handleFileLocationChange(event: any){
    this.excelToJsonService.onFileChange(event).subscribe({
        next: (dataString) => {
          this.isLocationExcelUploaded = !this.isLocationExcelUploaded;
          let ExcelToJSONLocation = JSON.parse(dataString);
          console.log('JSON Data:', ExcelToJSONLocation);
          this.locationDataSource = ExcelToJSONLocation.Sheet1;
          this.excelLoacationData.emit(ExcelToJSONLocation.Sheet1);
        },
        error: (error) => {
          this.isLocationExcelUploaded = false;
          console.error('Error reading file:', error);
        },
        complete: () => {
          console.log('File processing complete.');
        },
    })
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      this.isProductExcelUploaded = !this.isProductExcelUploaded;
      this.dataSource = this.ExcelToJSON.Sheet1;
      this.excelProductData.emit(this.ExcelToJSON.Sheet1);
    }
  }


  //Download template excel
  downloadExcel(Service: string) {
    this.excelTemplate.downloadExcel(Service);
  }

  downloadLocationExcel(Service: string){
    this.excelTemplate.downloadExcel(Service);
  }
}



  // private updateDataSource(): void {
  //   if (this.platform && this.country) {
  //     this.dataSource = [
  //       {
  //         platform: this.platform,
  //         platformId: 'AMZ001',
  //         webpid: 'W1234',
  //         brand: 'Dove',
  //         productType: 'Soap',
  //         country: this.country,
  //       },
  //       {
  //         platform: this.platform,
  //         platformId: 'AMZ001',
  //         webpid: 'W5678',
  //         brand: 'Himalaya',
  //         productType: 'Shampoo',
  //         country: this.country,
  //       },
  //       {
  //         platform: this.platform,
  //         platformId: 'AMZ001',
  //         webpid: 'W9101',
  //         brand: 'Colgate',
  //         productType: 'Toothpaste',
  //         country: this.country,
  //       },
  //     ];
  //   }
  // }