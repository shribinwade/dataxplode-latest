import { Component, Input, SimpleChanges } from '@angular/core';
import { ExcelToJsonService } from '../../../../../../core/services/excel-to-json-Utils/excel-to-json.service';
import { ExcelTemplateService } from '../../../../../../core/services/Excel-download-template/excel-template.service';


export interface Sheet{
  Sheet1:KeywordTableElements[];
}

export interface KeywordTableElements {
       platform: any,
       platformId: any,
       keyword: any,
       country: any,
}


@Component({
  selector: 'app-keyword-search-table',
  templateUrl: './keyword-search-table.component.html',
  styleUrl: './keyword-search-table.component.scss'
})
export class KeywordSearchTableComponent {

    @Input() country!: string; // Country input property
    @Input() platform!: string;

  displayedColumns: string[] = ['platformId','platform',  'keyword', 'country'];
  dataSource: KeywordTableElements[] = [];
  ExcelToJSON!:Sheet;

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
        console.error('Error reading file:', error);
      },
      complete: () => {
        console.log('File processing complete.');
      },
    });
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      this.dataSource = this.ExcelToJSON.Sheet1;
      //[
      //   {
      //     platform: this.platform,
      //     platformId: 'AMZ001',
      //     keyword: 'Best Soap',
      //     country: this.country,
      //   },
      //   {
      //     platform: this.platform,
      //     platformId: 'AMZ001',
      //     keyword: 'Herbal Shampoo',
      //     country: this.country,
      //   },
      //   {
      //     platform: this.platform,
      //     platformId: 'AMZ001',
      //     keyword: 'Organic Toothpaste',
      //     country: this.country,
      //   },
      // ];
    }
  }

    //Download template excel
    downloadExcel(Service: string) {
      this.excelTemplate.downloadExcel(Service);
    }

}
