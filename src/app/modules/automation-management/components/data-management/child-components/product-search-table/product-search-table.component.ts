import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-search-table',
  templateUrl: './product-search-table.component.html',
  styleUrl: './product-search-table.component.scss'
})
export class ProductSearchTableComponent implements OnInit, OnChanges {


  @Input() country!: string; // Country input property
  @Input() platform!: string;

  platformData: string = '';
  displayedColumns: string[] = ['platform', 'platformId', 'webpid', 'brand', 'productType', 'country'];
  dataSource: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform'] || changes['country']) {
      this.updateDataSource();
    }
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      this.dataSource = [
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'W1234',
          brand: 'Dove',
          productType: 'Soap',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'W5678',
          brand: 'Himalaya',
          productType: 'Shampoo',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'W9101',
          brand: 'Colgate',
          productType: 'Toothpaste',
          country: this.country,
        },
      ];
    }
  }
}

