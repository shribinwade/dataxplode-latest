import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { brandResult } from '../../../../../../../../../core/model/interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnChanges {

  @Input('newsdata') newsData:any;
  resultData!:brandResult;
  displayedColumns: string[] = ['index', 'title', 'descr'];
  dataSource = new MatTableDataSource<any>();

  constructor(){ 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resultData = this.newsData;
    this.changeTableData();
  }

  changeTableData(){
    debugger
    if(this.newsData!=null || undefined){
    this.dataSource = new MatTableDataSource<brandResult>(this.resultData.news);
    }
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<brandResult>(this.resultData.news);
  }

}
