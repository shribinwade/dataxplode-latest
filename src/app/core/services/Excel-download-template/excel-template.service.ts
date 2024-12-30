import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelTemplateService {

   KeywordData = [{ Platform: '', PlatformId: '', Keyword: '', Country: '' }]; // Example row
   ProductData = [{Platform:'',	PlatformId: '',	WebPID: '',	Brand: ''	,Product: '' ,Type: ''	,Country: ''}];
  
   worksheet!: XLSX.WorkSheet;

  //  Save the Excel file
   fileName:string = '';
   
  constructor() { }

  downloadExcel(service:String): void {
    // Define the data for the Excel file
    switch(service){
      case "Product Search": {
       // Convert JSON data to worksheet
       this.fileName = "ProductTemplate.xlsx";
       this.worksheet = XLSX.utils.json_to_sheet(this.ProductData);
       break;
      } 

      case "Keyword Search" :{
       this.fileName = "KeywordTemplate.xlsx";
       this.worksheet = XLSX.utils.json_to_sheet(this.KeywordData);
       break;
      }

      default: { 
        console.log("Invalid choice"); 
        break;              
     }
    }


    // Create a workbook and append the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, this.worksheet, 'Sheet1');

    // Generate an Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, this.fileName);
  }



}
