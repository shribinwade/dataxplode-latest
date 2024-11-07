import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportTableAsExcelService {
  private exportHistory: string[] = []; // Stores recent export messages

  constructor() { }


  exportTableAsExcel(data: any[], fileName: string): void {
    // Convert data to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and save
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);

    // Record the export action
    // this.addToExportHistory(`Exported file: ${fileName}.xlsx`);
  }
}
