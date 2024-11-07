import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { brandResult } from '../../../../../../../../../core/model/interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-news-search-result',
  templateUrl: './news-search-result.component.html',
  styleUrl: './news-search-result.component.scss'
})
export class NewsSearchResultComponent implements OnChanges {

  @Input('newsdata') newsData:any;
  resultData!:brandResult;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'title', 'descr'];

  constructor(){
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      this.resultData = this.newsData;
      this.changeTableData();
  }

  changeTableData(){
    debugger
    if(this.newsData!=null || undefined){
       this.dataSource = new MatTableDataSource<brandResult>(this.resultData.Search_result);
    }
  };

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<brandResult>(this.resultData.Search_result);
  }
}
