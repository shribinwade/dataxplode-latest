import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TabService } from '../../../../../core/services/marketTabService/tab.service';



@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrl: './market-search.component.scss'
})
export class MarketSearchComponent implements OnInit {

  @Input('data') data:any;
  constructor(private tabService: TabService){}



  ngOnInit(): void {
    // console.log(this.data); 
    // this.insertComponent('Market Trend And News');
  }



  insertComponent(code: string) {
   this.tabService.tabItemObservable.next(code);
  }
  
}
