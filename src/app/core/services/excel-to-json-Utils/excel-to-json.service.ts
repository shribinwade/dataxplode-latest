import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelToJsonService {

  constructor() { }

  onFileChange(event: any): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = () => {
        try {
          const data = reader.result;
          const workBook = XLSX.read(data, { type: 'binary' });
          const jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          const dataString = JSON.stringify(jsonData);
          observer.next(dataString); // Emit the result
          observer.complete(); // Indicate completion
        } catch (error) {
          observer.error(error); // Emit an error if something goes wrong
        }
      };

      reader.onerror = (error) => {
        observer.error(error); // Emit an error if FileReader fails
      };

      reader.readAsBinaryString(file);
    });
  }
}
