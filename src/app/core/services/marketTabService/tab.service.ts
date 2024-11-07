import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  tabItemObservable: Subject<string> = new Subject<string>();

  constructor() { }
  
  addNewTab(code: string){
    this.tabItemObservable.next(code);
  }
}
