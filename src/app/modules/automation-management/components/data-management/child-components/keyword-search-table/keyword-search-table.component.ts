import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ExcelToJsonService } from '../../../../../../core/services/excel-to-json-Utils/excel-to-json.service';
import { ExcelTemplateService } from '../../../../../../core/services/Excel-download-template/excel-template.service';


export interface Sheet{
  Sheet1:KeywordTableElements[];
}

export interface KeywordTableElements {
       platform: string,
       platformId: string,
       brand: string,
       country: string,
}


@Component({
  selector: 'app-keyword-search-table',
  templateUrl: './keyword-search-table.component.html',
  styleUrl: './keyword-search-table.component.scss'
})
export class KeywordSearchTableComponent {

  @Input() country!: string; // Country input property
  @Input() platform!: string;

  @Output() excelKeywordData = new EventEmitter<any>();
  @Output() excelLoacationData =  new EventEmitter<any>();
  

  displayedColumns: string[] = ['platformId','platform','brand','country'];
  dataSource: KeywordTableElements[] = [];
  locationDataSource: any[]=[];
  ExcelToJSON!:Sheet;
  isKeywordExcelUploaded: boolean = false;
  isLocationExcelUploaded: boolean = false;

  constructor(
      private excelToJsonService: ExcelToJsonService,
      private excelTemplate: ExcelTemplateService
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
       this.ExcelToJSON=  JSON.parse(dataString);
        console.log('JSON Data:', this.ExcelToJSON);
        console.log('JSON Data:', Object.keys(this.ExcelToJSON));
        console.log('JSON Data:', this.ExcelToJSON.Sheet1[0].country);
        this.updateDataSource();
        // Do something with the dataString
      },
      error: (error) => {
        this.isKeywordExcelUploaded = false;
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
      this.isKeywordExcelUploaded = !this.isKeywordExcelUploaded;
      this.dataSource = this.ExcelToJSON.Sheet1;
      console.log(this.dataSource);
      
      this.excelKeywordData.emit(this.ExcelToJSON.Sheet1);
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
