import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyword-search-table',
  templateUrl: './keyword-search-table.component.html',
  styleUrl: './keyword-search-table.component.scss'
})
export class KeywordSearchTableComponent {

    @Input() country!: string; // Country input property
    @Input() platform!: string;

    displayedColumns: string[] = ['platform', 'platformId', 'keyword', 'country'];
  dataSource: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform'] || changes['country']) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      this.dataSource = [
        {
          platform: this.platform,
          platformId: 'AMZ001',
          keyword: 'Best Soap',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          keyword: 'Herbal Shampoo',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          keyword: 'Organic Toothpaste',
          country: this.country,
        },
      ];
    }
  }

}
