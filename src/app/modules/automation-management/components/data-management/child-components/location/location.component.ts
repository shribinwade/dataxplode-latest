import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent implements OnInit {
  @Input() country!: string; // Country input property
  @Input() platform!: string;
  @Input() datasource!: any;

  displayedColumns: string[] = ['platform', 'country', 'location', 'pincode'];
  // dataSource: any[] = [];

  constructor() {}
  ngOnInit(): void {
    console.log(this.datasource);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform'] || changes['country']) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      // this.dataSource = this.datasource;
    }
  }
}
